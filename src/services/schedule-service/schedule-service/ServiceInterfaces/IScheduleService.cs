using schedule_service.DTO;
using schedule_service.Models;

namespace schedule_service.ServiceInterfaces;

public interface IScheduleService
{
    Task<(Schedule, UserRole, string)> Create(Schedule schedule);

    Task Delete(int id);

    Task CopyDay(int workdayId);

    Task CopyWeek(DateOnly from);

    Task SetSchedulesIntervalsByWorkday(WorkdayGetDto workday);

    Task<ICollection<Schedule>> GetSchedulesByWorkdayId(int workdayId);
}
