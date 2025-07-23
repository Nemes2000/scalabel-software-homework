using System.ComponentModel.DataAnnotations;

namespace workday_service.DTO;

public class WorkdayCreateDto
{
    [Required]
    public required bool IsOpen { get; set; }

    [Required]
    [DataType(DataType.Date)]
    public required DateOnly Date { get; set; }

    [DataType(DataType.DateTime)]
    public DateTime? OpeningTime { get; set; } = null;

    [DataType(DataType.DateTime)]
    public DateTime? ClosingTime { get; set; } = null;
}
