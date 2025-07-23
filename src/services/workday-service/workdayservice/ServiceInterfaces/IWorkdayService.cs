using workday_service.DTO;
using workday_service.Models;

namespace workday_service.ServiceInterfaces;

public interface IWorkdayService
{
    Task<Workday?> GetById(int id);

    Task<WorkdayWithSchedulesDTO?> GetByDate(DateOnly date);

    Task<Workday> Create(Workday workday);

    Task<WorkdayWithSchedulesDTO> Update(Workday newWorkday);

    Task<WorkdayIdDto> CopyWorkdayDataToNextDay(CopyWorkdayDto copyDay);

    Task<WorkdayIdsDto> GetNextSevenDaysIds(DateOnly from);

    Task DeleteWeekByFirstDay(DateOnly firstDay);
}