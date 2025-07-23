using System.ComponentModel.DataAnnotations;

namespace food_service.DTOs;

public class FoodChangeImageDto
{
    [Required]
    public required IFormFile Image { get; set; }
}
