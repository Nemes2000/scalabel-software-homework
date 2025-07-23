using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using schedule_service.Exceptions;
using schedule_service.DTO;
using schedule_service.ServiceInterfaces;
using schedule_service.Models;
using schedule_service.Clients;

namespace schedule_service.Controllers;

[ApiController]
[Route("[controller]")]
public class SchedulesController(
    IScheduleService service,
    IMapper mapper
    ) : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult<ScheduleWithEmployeeGetDto>> Create([FromBody] ScheduleCreateDto scheduleCreateDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var schedule = mapper.Map<Schedule>(scheduleCreateDto);
        try
        {
            var (createdSchedule, role, userName) = await service.Create(schedule);
            return Ok(new ScheduleWithEmployeeGetDto
            {
                Schedule = mapper.Map<ScheduleGetDto>(createdSchedule),
                Employee = new EmployeeForScheduleGetDTO
                {
                    Id = schedule.EmployeeId,
                    UserName = userName,
                    Role = role
                }
            });
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
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

    [HttpPost("copy-day")]
    public async Task<IActionResult> CopyDaySchedules([FromBody] WorkdayIdDto workday)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            await service.CopyDay(workday.WorkdayId);
            return NoContent();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPost("copy-week")]
    public async Task<IActionResult> CopyWeekSchedules([FromBody] CopyWeekDto copyWeek)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            await service.CopyWeek(copyWeek.FromDate);
            return NoContent();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPost("set-intervals")]
    public async Task<IActionResult> SetSchedulesIntervalsByWorkday([FromBody] WorkdayGetDto workday)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            await service.SetSchedulesIntervalsByWorkday(workday);
            return NoContent();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("workday/{workdayid}")]
    public async Task<ActionResult<ICollection<ScheduleGetDto>>> GetSchedulesByWorkdayId(int workdayid)
    {
        try
        {
            var schedules = await service.GetSchedulesByWorkdayId(workdayid);
            return Ok(schedules);
        }
        catch (EntityNotFoundException e)
        {
            return BadRequest(e.Message);
        }
    }
}