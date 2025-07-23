using System.ComponentModel.DataAnnotations;

namespace schedule_service.DTO;

public class EmployeeForScheduleGetDTO
{
    [Required]
    public required string Id { get; set; }

    [Required]
    [MaxLength(100)]
    public required string UserName { get; set; }

    [Required]
    [EnumDataType(typeof(UserRole))]
    public required UserRole Role { get; set; }
}

public enum UserRole
{
    Kitchen, Waiter, Customer, Admin
}
