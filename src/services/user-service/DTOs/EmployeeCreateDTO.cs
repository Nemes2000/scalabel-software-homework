using System.ComponentModel.DataAnnotations;
using UserService.Models;

namespace UserService.DTO
{
    public class EmployeeCreateDTO
    {
        [Required]
        [MaxLength(100)]
        public required string UserName { get; set; }

        [Required]
        [EmailAddress]
        [MaxLength(100)]
        public required string Email { get; set; }

        [Required]
        [Range(0, int.MaxValue)]
        public int HourlyWage { get; set; }

        [Required]
        [EnumDataType(typeof(UserRole))]
        public required UserRole Role { get; set; }

        [MaxLength(15)]
        [DataType(DataType.PhoneNumber)]
        public string? PhoneNumber { get; set; } = null;
    }
}
