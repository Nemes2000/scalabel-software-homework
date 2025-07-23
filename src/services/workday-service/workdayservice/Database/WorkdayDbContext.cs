using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.Text.Json;
using workday_service.Models;

namespace workday_service.Database;

public class WorkdayDbContext : DbContext
{
    public WorkdayDbContext(DbContextOptions<WorkdayDbContext> options) : base(options) { }

    public DbSet<Workday> Workdays => Set<Workday>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<Workday>().HasData(
            new Workday
            {
                Id = 1,
                Date = new DateOnly(2025, 1, 18),
                IsOpen = true,
                OpeningTime = new DateTime(2025, 1, 18, 8, 0, 0, DateTimeKind.Local),
                ClosingTime = new DateTime(2025, 1, 18, 17, 30, 0, DateTimeKind.Local)
            },
            new Workday
            {
                Id = 2,
                Date = new DateOnly(2025, 1, 19),
                IsOpen = true,
                OpeningTime = new DateTime(2025, 1, 19, 8, 0, 0, DateTimeKind.Local),
                ClosingTime = new DateTime(2025, 1, 19, 17, 30, 0, DateTimeKind.Local)
            },
            new Workday
            {
                Id = 3,
                Date = new DateOnly(2025, 1, 21),
                IsOpen = true,
                OpeningTime = new DateTime(2025, 1, 21, 8, 0, 0, DateTimeKind.Local),
                ClosingTime = new DateTime(2025, 1, 21, 16, 0, 0, DateTimeKind.Local)
            },
            new Workday
            {
                Id = 4,
                Date = new DateOnly(2025, 1, 22),
                IsOpen = false
            }
        );

        base.OnModelCreating(builder);
    }
}
