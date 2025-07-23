using System.ComponentModel.DataAnnotations;

namespace UserService.DTO
{
    public class ChangeWageDto
    {
        [Required]
        [Range(0, int.MaxValue)]
        public required int HourlyWage { get; set; }
    }
}
