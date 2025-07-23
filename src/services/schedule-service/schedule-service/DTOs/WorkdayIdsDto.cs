using System.ComponentModel.DataAnnotations;

namespace schedule_service.DTO
{
    public class WorkdayIdsDto
    {
        [Required]
        public required ICollection<int> WorkdayIds { get; set; }
    }
}
