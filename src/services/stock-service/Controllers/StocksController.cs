using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using stock_service.Exceptions;
using stock_service.DTO;
using stock_service.Models;
using stock_service.ServiceInterfaces;

namespace stock_service.Controllers;

[ApiController]
[Route("[controller]")]
public class StocksController(
    IStockService service,
    IMapper mapper
) : ControllerBase
{
    [HttpGet]
    public async Task<ICollection<Stock>> Index()
    {
        return await service.GetAll();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Stock>> Get(int id)
    {
        var stock = await service.Get(id);
        if (stock == null)
        {
            return NotFound();
        }
        return stock;
    }

    [HttpPost]
    public async Task<ActionResult<Stock>> Create([FromBody] StockCreateDto stockCreateDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var stock = mapper.Map<Stock>(stockCreateDto);
        try
        {
            return await service.Create(stock);
        }
        catch (NameCollisionException e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPatch("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] StockUpdateDto stockUpdateDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        if (!await service.Update(id, stockUpdateDto.Amount))
        {
            return Conflict();
        }
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            await service.Delete(id);
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}
