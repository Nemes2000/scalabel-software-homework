using System.ComponentModel.DataAnnotations;

namespace workday_service.DTO
{
    public class WorkdayIdDto
    {
        [Required]
        public required int WorkdayId { get; set; }
    }
}
