using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using schedule_service.Models;
using System.Text.Json;

namespace schedule_service.Database;

public class ScheduleDbContext : DbContext
{
    public ScheduleDbContext(DbContextOptions<ScheduleDbContext> options) : base(options) { }

    public DbSet<Schedule> Schedules => Set<Schedule>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<Schedule>().HasData(
            new Schedule
            {
                Id = 1,
                WorkdayId = 1,
                EmployeeId = "waiter-id-1",
                From = new DateTime(2025, 1, 18, 8, 0, 0, DateTimeKind.Local),
                To = new DateTime(2025, 1, 18, 17, 30, 0, DateTimeKind.Local),
            },
            new Schedule
            {
                Id = 2,
                WorkdayId = 1,
                EmployeeId = "kitchen-id-1",
                From = new DateTime(2025, 1, 18, 8, 0, 0, DateTimeKind.Local),
                To = new DateTime(2025, 1, 18, 17, 30, 0, DateTimeKind.Local),
            },
            new Schedule
            {
                Id = 3,
                WorkdayId = 2,
                EmployeeId = "waiter-id-1",
                From = new DateTime(2025, 1, 19, 8, 0, 0, DateTimeKind.Local),
                To = new DateTime(2025, 1, 19, 16, 0, 0, DateTimeKind.Local),
            }
        );

        base.OnModelCreating(builder);
    }
}
