using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.Text.Json;
using UserService.ServiceInterfaces;
using UserService.Models;

namespace UserService.Database;

public class UserDbContext(DbContextOptions options) : IdentityDbContext<User>(options)
{
     protected override void OnModelCreating(ModelBuilder builder)
    {
        // Add roles for Identity
        foreach (var role in Enum.GetValues(typeof(UserRole)).Cast<UserRole>())
        {
            builder.Entity<IdentityRole>().HasData(
                new
                {
                    Id = ((int)role).ToString(),
                    Name = role.ToString(),
                    NormalizedName = role.ToString().ToUpper(),
                }
            );
        }

        // Add dummy users with roles
        var waiter = new User
        {
            Id = "waiter-id-1",
            UserName = "Pincér Péter",
            Email = "peter@mail.com",
            NormalizedUserName = "PINCÉR PÉTER",
            NormalizedEmail = "PETER@MAIL.COM",
            EmailConfirmed = true,
            PhoneNumber = "06301231234",
            HourlyWage = 2200,
            SecurityStamp = Guid.NewGuid().ToString("D")
        };

        var kitchen = new User
        {
            Id = "kitchen-id-1",
            UserName = "Séf Sára",
            Email = "sara@mail.com",
            NormalizedUserName = "SÉF SÁRA",
            NormalizedEmail = "SARA@MAIL.COM",
            EmailConfirmed = true,
            PhoneNumber = "06301231235",
            HourlyWage = 2000,
            SecurityStamp = Guid.NewGuid().ToString("D")
        };

        builder.Entity<User>().HasData(
            waiter, kitchen
        );

        builder.Entity<IdentityUserRole<string>>().HasData(
            new IdentityUserRole<string>
            {
                UserId = waiter.Id,
                RoleId = ((int)UserRole.Waiter).ToString()
            },
            new IdentityUserRole<string>
            {
                UserId = kitchen.Id,
                RoleId = ((int)UserRole.Kitchen).ToString()
            }
        );

        base.OnModelCreating(builder);
    }
}
