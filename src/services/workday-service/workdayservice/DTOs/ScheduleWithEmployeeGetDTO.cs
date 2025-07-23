using System.ComponentModel.DataAnnotations;

namespace workday_service.DTO;

public class ScheduleGetDTO
{
    public int Id { get; set; }

    [Required]
    [DataType(DataType.DateTime)]
    public required DateTime From { get; set; }

    [Required]
    [DataType(DataType.DateTime)]
    public required DateTime To { get; set; }

    [Required]
    public int WorkdayId { get; set; }

    [Required]
    public required string EmployeeId { get; set; }
}

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

public class ScheduleWithEmployeeGetDTO
{
    public required ScheduleGetDTO Schedule { get; set; }

    public required EmployeeForScheduleGetDTO Employee { get; set; }
}