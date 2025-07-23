using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace stock_service.Models;

[PrimaryKey(nameof(Id))]
public class Stock
{
    public int Id { get; set; }

    [Key]
    [Required]
    [MaxLength(100)]
    public required string Name { get; set; }

    [Required]
    [Range(0, int.MaxValue)]
    public int Amount { get; set; } = 0;

    [Required]
    [EnumDataType(typeof(QuantityUnit))]
    public required QuantityUnit Unit { get; set; }
}

public enum QuantityUnit
{
    Kilogram, Gram, Liter, Milliliter, Piece
}