using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace schedule_service.Models;

[PrimaryKey(nameof(Id))]
public class Schedule
{
    public int Id { get; set; }

    [Required]
    [DataType(DataType.DateTime)]
    public required DateTime From { get; set; }

    [Required]
    [DataType(DataType.DateTime)]
    public required DateTime To { get; set; }

    [Required]
    public required string EmployeeId { get; set; }

    [Required]
    public required int WorkdayId { get; set; }
}
