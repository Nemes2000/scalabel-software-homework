using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UserService.Exceptions;
using System.Data;
using UserService.DTO;
using UserService.ServiceInterfaces;
using UserService.Models;

namespace UserService.Controllers;

[ApiController]
[Route("[controller]")]
public class UsersController(
    IMapper mapper,
    IUserService service
) : ControllerBase
{

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<EmployeeGetDto>> CreateEmployee([FromBody] EmployeeCreateDTO createDTO)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var (result, user, role) = await service.CreateEmployee(createDTO);
        if (result.Succeeded && user != null && role != null)
        {
            return new EmployeeGetDto
            {
                Id = user.Id,
                Email = user.Email,
                UserName = user.UserName,
                HourlyWage = user.HourlyWage,
                PhoneNumber = user.PhoneNumber,
                Role = (UserRole)role,
            };
        }
        else
        {
            return BadRequest(result.Errors.Select(e => e.Description));
        }
    }

    [HttpPost("{id}/wage")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> ChangeWageEmployee(string id, [FromBody] ChangeWageDto wageDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            await service.ChangeWageEmployee(id, wageDto.HourlyWage);
            return NoContent();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<ICollection<EmployeeGetDto>>> GetEmployees()
    {
        var employees = await service.GetEmployees();
        return employees.Select(e => new EmployeeGetDto
        {
            Id = e.Item1.Id,
            Email = e.Item1.Email,
            Role = e.Item2,
            UserName = e.Item1.UserName,
            HourlyWage = e.Item1.HourlyWage,
            PhoneNumber = e.Item1.PhoneNumber,
        }).ToList();
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> GetUserById(string id)
    {
        try
        {
            var (user, role) = await service.GetUserById(id);
            var employee = new EmployeeGetDto
            {
                Id = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                Role = role,
                HourlyWage = user.HourlyWage,
                PhoneNumber = user.PhoneNumber,
            };
            return Ok(employee);
            
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> DeleteEmployee(string id)
    {
        try
        {
            var result = await service.DeleteEmployee(id);
            if (result.Succeeded)
            {
                return Ok();
            }
            else
            {
                return BadRequest(result.Errors.Select(e => e.Description));
            }
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}
