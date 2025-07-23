using System.ComponentModel.DataAnnotations;

namespace schedule_service.DTO;

    public class WorkdayGetDto
{
    public int Id { get; set; }

    [Required]
    public required bool IsOpen { get; set; }

    [DataType(DataType.DateTime)]
    public DateTime? OpeningTime { get; set; } = null;

    [DataType(DataType.DateTime)]
    public DateTime? ClosingTime { get; set; } = null;
}