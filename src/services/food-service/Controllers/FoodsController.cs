using AutoMapper;
using food_service.DTOs;
using food_service.Models;
using food_service.ServiceInterfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using food_service.Exceptions;

namespace food_service.Controllers;

[ApiController]
[Route("[controller]")]
public class FoodsController(
    IFoodService service,
    IMapper mapper
) : ControllerBase
{
    private const string VALID_IMAGE_FORMAT = "image/jpeg";
    private const string IMAGE_FORMAT_NOT_SUPPORTED = "Only jpeg is supported";

    [HttpGet]
    public async Task<ICollection<Food>> Index()
    {
        return await service.GetAll();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Food>> Get(int id)
    {
        var food = await service.Get(id);
        if (food == null)
        {
            return NotFound();
        }
        return food;
    }

    [HttpGet("{id}/image")]
    [AllowAnonymous]
    public async Task<IActionResult> GetImage(int id)
    {
        try
        {
            var image = await service.GetImage(id);
            return File(image, "image/jpeg");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPost]
    public async Task<ActionResult<Food>> Create([FromBody] FoodCreateDto foodCreateDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var food = mapper.Map<Food>(foodCreateDto);
        try
        {
            return await service.Create(food);
        }
        catch (NameCollisionException e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPatch("{id}")]
    public async Task<ActionResult<Food>> Update(int id, [FromBody] FoodUpdateDto foodUpsertDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        var food = mapper.Map<Food>(foodUpsertDto);
        food.Id = id;

        try
        {
            return await service.Update(food);
        }
        catch (NameCollisionException e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPatch("{id}/image")]
    public async Task<ActionResult<Food>> ChangeImage(int id, [FromForm] FoodChangeImageDto changeImageDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        if (changeImageDto.Image.ContentType != VALID_IMAGE_FORMAT)
        {
            return BadRequest(IMAGE_FORMAT_NOT_SUPPORTED);
        }

        try
        {
            return await service.ChangeImage(id, changeImageDto.Image.OpenReadStream());
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            await service.Delete(id);
            return Ok();
        }
        catch (EntityNotFoundException e)
        {
            return BadRequest(e.Message);
        }
    }
}