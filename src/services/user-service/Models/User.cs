using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace UserService.Models;

[PrimaryKey(nameof(Id))]
public class User : IdentityUser
{
    [Required]
    [MaxLength(100)]
    public override required string UserName { get; set; }

    [Key]
    [Required]
    [EmailAddress]
    [MaxLength(100)]
    public override required string Email { get; set; }

    [MaxLength(15)]
    [DataType(DataType.PhoneNumber)]
    public override string? PhoneNumber { get; set; } = null;

    [Range(0, int.MaxValue)]
    public int HourlyWage { get; set; } = 0;
}

public enum UserRole
{
    Kitchen, Waiter, Customer, Admin
}