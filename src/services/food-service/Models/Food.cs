using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace food_service.Models;

[PrimaryKey(nameof(Id))]
public class Food
{
    public int Id { get; set; }

    [Key]
    [Required]
    [MaxLength(100)]
    public required string Name { get; set; }

    [MaxLength(200)]
    public string ImagePath { get; set; } = string.Empty;

    [Required]
    [MaxLength(1000)]
    public required string Description { get; set; }

    [Required]
    [Range(0, int.MaxValue)]
    public required int Price { get; set; }

    [Required]
    [EnumDataType(typeof(FoodCategory))]
    public required FoodCategory Category { get; set; }
}

public enum FoodCategory
{
    Soup, Main, Dessert, FastFood, Beverage
}