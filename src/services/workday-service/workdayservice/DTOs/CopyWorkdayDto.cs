using System.ComponentModel.DataAnnotations;

namespace workday_service.DTO;

public class CopyWorkdayDto
{
    [Required]
    public required int WorkdayId { get; set; }

    [Required]
    public required int PlusDay { get; set; }
}