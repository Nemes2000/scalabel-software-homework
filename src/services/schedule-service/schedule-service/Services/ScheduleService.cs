using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using schedule_service.Clients;
using schedule_service.Database;
using schedule_service.DTO;
using schedule_service.Exceptions;
using schedule_service.Models;
using schedule_service.ServiceInterfaces;
using static iText.StyledXmlParser.Jsoup.Select.Evaluator;

namespace schedule_service.Services;

public class ScheduleService(
    ScheduleDbContext dbContext,
    UserClient userClient,
    WorkdayClient workdayClient
) : IScheduleService
{
    async Task<(Schedule, UserRole, string)> IScheduleService.Create(Schedule schedule)
    {   
        var workday = await workdayClient.GetWorkdayById(schedule.WorkdayId);
        if (!workday.IsOpen || schedule.From < workday.OpeningTime || schedule.To > workday.ClosingTime)
        {
            throw new InvalidDateRangeException();
        }

        var user = await userClient.GetEmployeeById(schedule.EmployeeId);
        var role = user.Role;

        if (role != UserRole.Kitchen && role != UserRole.Waiter)
        {
            throw new InvalidUserRoleException(role);
        }

        if (await dbContext.Schedules.AnyAsync(s => s.EmployeeId == schedule.EmployeeId && !(s.To <= schedule.From || s.From >= schedule.To)))
        {
            throw new DateCollisionException(schedule);
        }

        await dbContext.Schedules.AddAsync(schedule);
        await dbContext.SaveChangesAsync();

        return (schedule, role, user.UserName);
    }

    async Task IScheduleService.Delete(int id)
    {
        var schedule = await dbContext.Schedules.FindAsync(id) ?? throw new EntityNotFoundException(nameof(Schedule));
        dbContext.Schedules.Remove(schedule);
        await dbContext.SaveChangesAsync();
    }

    async Task IScheduleService.CopyDay(int workdayId)
    {
        await CopyWorkdayWithSchedules(workdayId, 1);
    }

    async Task IScheduleService.CopyWeek(DateOnly from)
    {
        await workdayClient.DeleteWeekByFirstDay(from.AddDays(7));
        var workdayIds = await workdayClient.GetWeekDaysIds(from);
        foreach (var id in workdayIds.WorkdayIds)
        {
            await CopyWorkdayWithSchedules(id, 7);
        }
    }

    private async Task CopyWorkdayWithSchedules(int workdayId, int plusDays)
    {
        var newDateId = await workdayClient.CopyWorkdayDataToNextDay(workdayId, plusDays);
        var currentSchedules = await dbContext.Schedules.Where(s => s.WorkdayId == workdayId).ToListAsync();
        var newSchedules = currentSchedules.Select(c => new Schedule
        {
            EmployeeId = c.EmployeeId,
            From = c.From.AddDays(plusDays),
            To = c.To.AddDays(plusDays),
            WorkdayId = newDateId.WorkdayId
        }).ToList();
        newSchedules.ForEach(async n => await dbContext.Schedules.AddAsync(n));
        await dbContext.SaveChangesAsync();
    }

    public async Task SetSchedulesIntervalsByWorkday(WorkdayGetDto workday)
    {
        var schedules = await dbContext.Schedules.Where(s => s.WorkdayId == workday.Id).ToListAsync();

        if (!workday.IsOpen)
        {
            dbContext.RemoveRange(schedules);
            await dbContext.SaveChangesAsync();
        }
        else if (workday.OpeningTime.HasValue && workday.ClosingTime.HasValue)
        {
            foreach (var schedule in schedules)
            {
                if (schedule.From < workday.OpeningTime && schedule.To > workday.OpeningTime)
                {
                    schedule.From = workday.OpeningTime.Value;
                }
                if (schedule.To > workday.ClosingTime && schedule.From < workday.ClosingTime)
                {
                    schedule.To = workday.ClosingTime.Value;
                }

                if (!(schedule.From >= workday.OpeningTime.Value && schedule.To <= workday.ClosingTime.Value))
                {
                    dbContext.Remove(schedule);
                }
            }
            await dbContext.SaveChangesAsync();
        }
    }

    public async Task<ICollection<Schedule>> GetSchedulesByWorkdayId(int workdayId)
    {
        return await dbContext.Schedules.Where(s => s.WorkdayId == workdayId).ToListAsync();
    }
}
