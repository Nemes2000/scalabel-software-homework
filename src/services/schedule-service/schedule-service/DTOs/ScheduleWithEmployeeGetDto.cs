using System.ComponentModel.DataAnnotations;

namespace schedule_service.DTO;

public class ScheduleWithEmployeeGetDto
{
    public required ScheduleGetDto Schedule { get; set; }

    public required EmployeeForScheduleGetDTO Employee { get; set; }
}