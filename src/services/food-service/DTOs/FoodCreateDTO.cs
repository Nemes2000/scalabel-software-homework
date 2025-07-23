using food_service.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace food_service.DTOs;

public class FoodCreateDto
{
    [Required]
    [StringLength(maximumLength: 100, MinimumLength = 1)]
    [DefaultValue("")]
    public required string Name { get; set; }

    [Required]
    [StringLength(maximumLength: 1000, MinimumLength = 0)]
    [DefaultValue("")]
    public required string Description { get; set; }

    [Required]
    [Range(0, int.MaxValue)]
    [DefaultValue(0)]
    public required int Price { get; set; }

    [Required]
    [EnumDataType(typeof(FoodCategory))]
    public required FoodCategory Category { get; set; }
}

