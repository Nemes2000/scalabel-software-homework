using System.ComponentModel.DataAnnotations;

namespace workday_service.DTO;

public class WorkdayUpdateDto
{
    [Required]
    public required bool IsOpen { get; set; }

    [DataType(DataType.DateTime)]
    public DateTime? OpeningTime { get; set; } = null;

    [DataType(DataType.DateTime)]
    public DateTime? ClosingTime { get; set; } = null;
}
