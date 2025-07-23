using Microsoft.AspNetCore.Identity;
using UserService.DTO;
using UserService.ServiceInterfaces;
using UserService.Database;
using UserService.Exceptions;
using UserService.Models;


namespace UserService.Services;

public class UserService(
    UserDbContext dbContext,
    UserManager<User> userManager
) : IUserService
{
    async Task<(IdentityResult, User?, UserRole?)> IUserService.CreateEmployee(EmployeeCreateDTO createDTO)
    {
        var user = new User()
        {
            UserName = createDTO.UserName,
            Email = createDTO.Email,
            HourlyWage = createDTO.HourlyWage,
            PhoneNumber = createDTO.PhoneNumber
        };
        var result = await userManager.CreateAsync(user);

        if (result.Succeeded)
        {
            result = await userManager.AddToRoleAsync(user, createDTO.Role.ToString());
            if (result.Succeeded)
            {
                return (result, user, createDTO.Role);
            }
        }
        return (result, null, null);
    }

    async Task IUserService.ChangeWageEmployee(string userId, int wage)
    {
        var user = await userManager.FindByIdAsync(userId) ?? throw new EntityNotFoundException(nameof(User));
        var roles = await userManager.GetRolesAsync(user);

        user.HourlyWage = wage;
        await dbContext.SaveChangesAsync();
    }

    async Task<ICollection<(User, UserRole)>> IUserService.GetEmployees()
    {
        var employees = new List<(User, UserRole)>();
        employees.AddRange((await userManager.GetUsersInRoleAsync(UserRole.Waiter.ToString())).Select(u => (u, UserRole.Waiter)));
        employees.AddRange((await userManager.GetUsersInRoleAsync(UserRole.Kitchen.ToString())).Select(u => (u, UserRole.Kitchen)));
        return employees;
    }

    async Task<IdentityResult> IUserService.DeleteEmployee(string id)
    {
        var user = await userManager.FindByIdAsync(id) ?? throw new EntityNotFoundException(nameof(User));
        var roles = await userManager.GetRolesAsync(user);
        if (Enum.TryParse(roles.FirstOrDefault(), out UserRole role))
        {
            if (role == UserRole.Waiter || role == UserRole.Kitchen)
            {
                return await userManager.DeleteAsync(user);
            }
            else
            {
                throw new ManagerDeletionException();
            }
        }
        throw new UnexpectedException("Selected user has no role");
    }

    async Task<(User, UserRole)> IUserService.GetUserById(string id)
    {
        var user = await userManager.FindByIdAsync(id) ?? throw new EntityNotFoundException(nameof(User));
        var roles = await userManager.GetRolesAsync(user);

        return (user, (UserRole)Enum.Parse(typeof(UserRole), roles.FirstOrDefault()!));
    }
}
