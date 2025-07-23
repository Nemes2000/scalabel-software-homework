using System.ComponentModel.DataAnnotations;

namespace schedule_service.DTO
{
    public class WorkdayIdDto
    {
        [Required]
        public required int WorkdayId { get; set; }
    }
}
