using System.ComponentModel.DataAnnotations;

namespace workday_service.DTO
{
    public class WorkdayIdsDto
    {
        [Required]
        public required List<int> WorkdayIds { get; set; }
    }
}
