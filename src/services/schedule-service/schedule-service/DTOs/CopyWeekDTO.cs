using System.ComponentModel.DataAnnotations;

namespace schedule_service.DTO;

public class CopyWeekDto
{
    [Required]
    [DataType(DataType.Date)]
    public required DateOnly FromDate { get; set; }
}