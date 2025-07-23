using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using food_service.Models;

namespace food_service.DTOs;

public class FoodUpdateDto
{
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
