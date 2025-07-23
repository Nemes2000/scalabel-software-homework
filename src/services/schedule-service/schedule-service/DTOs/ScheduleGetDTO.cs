using System.ComponentModel.DataAnnotations;

namespace schedule_service.DTO;

public class ScheduleGetDto
{
    public int Id { get; set; }

    [Required]
    [DataType(DataType.DateTime)]
    public required DateTime From { get; set; }

    [Required]
    [DataType(DataType.DateTime)]
    public required DateTime To { get; set; }

    [Required]
    public required string EmployeeId { get; set; }

    [Required]
    public int WorkdayId { get; set; }
}
