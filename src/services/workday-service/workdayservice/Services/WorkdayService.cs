using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using workday_service.Database;
using workday_service.Exceptions;
using workday_service.DTO;
using workday_service.ServiceInterfaces;
using workday_service.Models;
using workday_service.Clients;

namespace workday_service.Services;

public class WorkdayService(
    WorkdayDbContext dbContext,
    ScheduleClient scheduleClient,
    UserClient userClient
) : IWorkdayService
{
    async Task<WorkdayWithSchedulesDTO?> IWorkdayService.GetByDate(DateOnly date)
    {
        var workday = await dbContext.Workdays.SingleOrDefaultAsync(w => w.Date == date);
        if (workday == null)
        {
            return null;
        }

        return await GetWorkdayWithSchedulesAndEmployees(workday);
    }

    async Task<Workday> IWorkdayService.Create(Workday workday)
    {
        if (await dbContext.Workdays.AnyAsync(w => w.Date == workday.Date))
        {
            throw new WorkdayAlreadyExistsException();
        }
        ValidateWorkday(workday);
        await dbContext.Workdays.AddAsync(workday);
        await dbContext.SaveChangesAsync();

        return workday;
    }

    async Task<WorkdayWithSchedulesDTO> IWorkdayService.Update(Workday newWorkday)
    {
        var workday = await dbContext.Workdays.FindAsync(newWorkday.Id) ?? throw new EntityNotFoundException(nameof(Workday));
        ValidateWorkday(newWorkday);

        workday.IsOpen = newWorkday.IsOpen;
        workday.OpeningTime = newWorkday.OpeningTime;
        workday.ClosingTime = newWorkday.ClosingTime;
        await scheduleClient.SetSchedulesInterval(workday);
        await dbContext.SaveChangesAsync();
        return await GetWorkdayWithSchedulesAndEmployees(workday);
    }

    private async Task<WorkdayWithSchedulesDTO> GetWorkdayWithSchedulesAndEmployees(Workday workday)
    {
        var employees = await userClient.GetEmployeesAsync();
        var schedules = await scheduleClient.GetSchedulesByWorkdayId(workday.Id);
        var scheduleDtos = new List<ScheduleWithEmployeeGetDTO>();
        foreach (var s in schedules)
        {
            var employee = employees.Where(e => e.Id == s.EmployeeId).Single();
            scheduleDtos.Add(new ScheduleWithEmployeeGetDTO()
            {
                Schedule = s,
                Employee = new EmployeeForScheduleGetDTO
                {
                    Id = s.EmployeeId,
                    UserName = employee.UserName,
                    Role = employee.Role,
                }
            });
        }

        return new WorkdayWithSchedulesDTO { Workday = workday, Schedules = scheduleDtos };
    }

    private static void ValidateWorkday(Workday workday)
    {
        if (!workday.IsOpen && (workday.OpeningTime.HasValue || workday.ClosingTime.HasValue))
        {
            throw new WorkdayIsNotOpenException();
        }

        if (workday.IsOpen && (!workday.OpeningTime.HasValue || !workday.ClosingTime.HasValue))
        {
            throw new WorkdayIsOpenException();
        }
    }

    public async Task<Workday?> GetById(int id)
    {
        return await dbContext.Workdays.FindAsync(id) ?? throw new EntityNotFoundException(nameof(Workday));
    }

    public async Task<WorkdayIdDto> CopyWorkdayDataToNextDay(CopyWorkdayDto copyDay)
    {
        var workday = await dbContext.Workdays.FindAsync(copyDay.WorkdayId) ?? throw new EntityNotFoundException(nameof(Workday));
        var nextDay = await dbContext.Workdays.FirstOrDefaultAsync(w => w.Date == workday.Date.AddDays(copyDay.PlusDay));
        if (nextDay != null)
        {
            dbContext.Workdays.Remove(nextDay);
            await dbContext.SaveChangesAsync();
        }

        var newWorkday = new Workday
        {
            IsOpen = workday.IsOpen,
            Date = workday.Date.AddDays(copyDay.PlusDay),
            OpeningTime = workday.OpeningTime?.AddDays(copyDay.PlusDay),
            ClosingTime = workday.ClosingTime?.AddDays(copyDay.PlusDay),
        };
        await dbContext.Workdays.AddAsync(newWorkday);
        await dbContext.SaveChangesAsync();

        return new WorkdayIdDto() { WorkdayId = newWorkday.Id };
    }

    public async Task<WorkdayIdsDto> GetNextSevenDaysIds(DateOnly from)
    {
        var workdayIds = new List<int>();
        for (int i = 0; i < 7; i++)
        {
            var w = await dbContext.Workdays.FirstOrDefaultAsync(w => w.Date == from.AddDays(i));
            if (w != null)
            {
                workdayIds.Add(w.Id);
            }
        }

        return new WorkdayIdsDto(){ WorkdayIds = workdayIds };
    }

    public async Task DeleteWeekByFirstDay(DateOnly firstDay)
    {
        for (int i = 0; i < 7; i++)
        {
            var w = await dbContext.Workdays.FirstOrDefaultAsync(w => w.Date == firstDay.AddDays(i));
            if (w != null)
            {
                dbContext.Workdays.Remove(w);
            }
        }
        await dbContext.SaveChangesAsync();
    }
}