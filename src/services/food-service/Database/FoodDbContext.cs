using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.Text.Json;
using food_service.ServiceInterfaces;
using food_service.Models;

namespace food_service.Database;

public class FoodDbContext : DbContext
{
    public FoodDbContext(DbContextOptions<FoodDbContext> options) : base(options) { }

    public DbSet<Food> Foods => Set<Food>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<Food>().HasData(
            new Food { Id = 1, Name = "Burger", Category = FoodCategory.Main, Description = "Juicy beef patty, cheddar, lettuce, tomato, pickles, and house sauce on a brioche bun.", Price = 1500, ImagePath = "1.jpg" },
            new Food { Id = 2, Name = "Pasta", Category = FoodCategory.Main, Description = "Al dente pasta in creamy garlic sauce with sun-dried tomatoes, spinach, and Parmesan.", Price = 1200, ImagePath = "2.jpg" },
            new Food { Id = 3, Name = "Soup", Category = FoodCategory.Soup, Description = "Roasted tomatoes blended with fresh basil and cream, served with crispy grilled cheese croutons.", Price = 1000, ImagePath = "3.jpg" },
            new Food { Id = 4, Name = "Salad", Category = FoodCategory.Main, Description = "Fresh greens, olives, feta, cucumbers, and tomatoes with lemon-oregano vinaigrette.", Price = 800, ImagePath = "4.jpg" }
        );

        base.OnModelCreating(builder);
    }
}
