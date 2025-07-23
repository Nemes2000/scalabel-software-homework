using schedule_service.Validators;
using System.ComponentModel.DataAnnotations;

namespace schedule_service.DTO;

public class ScheduleCreateDto
{
    [Required]
    public required string EmployeeId { get; set; }

    [Required]
    public required int WorkdayId { get; set; }

    [Required]
    [IsLessThan(nameof(To))]
    public required DateTime From { get; set; }

    [Required]
    public required DateTime To { get; set; }
}
