using Microsoft.AspNetCore.Identity;
using UserService.DTO;
using UserService.Models;

namespace UserService.ServiceInterfaces;

public interface IUserService
{
    Task<(IdentityResult, User?, UserRole?)> CreateEmployee(EmployeeCreateDTO createDTO);

    Task ChangeWageEmployee(string userId, int wage);

    Task<ICollection<(User, UserRole)>> GetEmployees();

    Task<IdentityResult> DeleteEmployee(string id);

    Task<(User, UserRole)> GetUserById(string id);
}
