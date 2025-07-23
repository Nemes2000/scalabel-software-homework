using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace workday_service.Models;

[PrimaryKey(nameof(Id))]
public class Workday
{
    public int Id { get; set; }

    [Required]
    public required bool IsOpen { get; set; }

    [Required]
    [DataType(DataType.Date)]
    public required DateOnly Date { get; set; }

    [DataType(DataType.DateTime)]
    public DateTime? OpeningTime { get; set; } = null;

    [DataType(DataType.DateTime)]
    public DateTime? ClosingTime { get; set; } = null;
}
