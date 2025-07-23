using System.ComponentModel.DataAnnotations;
using workday_service.Models;

namespace workday_service.DTO;

public class WorkdayWithSchedulesDTO
{
    [Required]
    public required Workday Workday { get; set; }

    [Required]
    public required List<ScheduleWithEmployeeGetDTO> Schedules { get; set; } = [];
}