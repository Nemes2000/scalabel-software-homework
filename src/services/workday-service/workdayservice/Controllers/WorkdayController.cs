using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using workday_service.DTO;
using workday_service.Models;
using workday_service.ServiceInterfaces;

namespace workday_service.Controllers;

[ApiController]
[Route("[controller]")]
public class WorkdayController(IWorkdayService service, IMapper mapper) : ControllerBase
{
    [HttpGet("by-date")]
    public async Task<ActionResult<WorkdayWithSchedulesDTO?>> GetByDate([FromQuery] DateOnly date)
    {
        return Ok(await service.GetByDate(date));
    }

    [HttpPost]
    public async Task<ActionResult<Workday>> Create([FromBody] WorkdayCreateDto createDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        if (createDto.OpeningTime.HasValue && createDto.ClosingTime.HasValue && createDto.ClosingTime < createDto.OpeningTime)
        {
            return BadRequest();
        }

        try
        {
            var workday = mapper.Map<Workday>(createDto);
            return Ok(await service.Create(workday));
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPatch("{id}")]
    public async Task<ActionResult<WorkdayWithSchedulesDTO>> Update(int id, [FromBody] WorkdayUpdateDto updateDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        if (updateDto.OpeningTime.HasValue && updateDto.ClosingTime.HasValue && updateDto.ClosingTime < updateDto.OpeningTime)
        {
            return BadRequest();
        }

        var workday = mapper.Map<Workday>(updateDto);
        workday.Id = id;

        try
        {
            return await service.Update(workday);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Workday?>> GetById(int id)
    {
        try
        {
            return Ok(await service.GetById(id));
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPost("copy-day")]
    public async Task<ActionResult<WorkdayIdDto>> CopyWorkdayDataToNextDay(CopyWorkdayDto copyDay)
    {
        return Ok(await service.CopyWorkdayDataToNextDay(copyDay));
    }

    [HttpGet("next-seven-day")]
    public async Task<ActionResult<WorkdayIdsDto?>> GetNextSevenDaysIds([FromQuery] DateOnly from)
    {
        return Ok(await service.GetNextSevenDaysIds(from));
    }

    [HttpDelete("delete-week/{firstDay}")]
    public async Task<ActionResult> DeleteWeekByFirstDay(DateOnly firstDay)
    {
        await service.DeleteWeekByFirstDay(firstDay);
        return NoContent();
    }
}