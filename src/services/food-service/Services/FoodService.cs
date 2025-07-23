using food_service.Models;
using food_service.ServiceInterfaces;
using Microsoft.EntityFrameworkCore;
using food_service.Database;
using food_service.Exceptions;

namespace food_service.Services;

public class FoodService(FoodDbContext dbContext) : IFoodService
{
    private const string BASE_IMAGE_PATH = "resources/food-pictures/";

    async Task<ICollection<Food>> IFoodService.GetAll()
    {
        return await dbContext.Foods.ToListAsync();
    }

    async Task<Food?> IFoodService.Get(int id)
    {
        return await dbContext.Foods.FindAsync(id);
    }

    async Task<Stream> IFoodService.GetImage(int id)
    {
        var food = await dbContext.Foods.FindAsync(id) ?? throw new EntityNotFoundException(nameof(Food));
        var jpgPath = $"{BASE_IMAGE_PATH}{food.Id}.jpg";
        var jpegPath = $"{BASE_IMAGE_PATH}{food.Id}.jpeg";

        if (File.Exists(jpgPath))
        {
            return await Task.FromResult(File.OpenRead(jpgPath));
        }
        if (File.Exists(jpegPath))
        {
            return await Task.FromResult(File.OpenRead(jpegPath));
        }
        else
        {
            throw new FileNotFoundException($"Image not found for food with id {food.Id}");
        }
    }

    async Task<Food> IFoodService.Create(Food food)
    {
        bool nameCollision = await dbContext.Foods.AnyAsync(f => f.Name == food.Name);
        if (nameCollision)
        {
            throw new NameCollisionException(nameof(Food).ToLower());
        }

        await dbContext.Foods.AddAsync(food);
        await dbContext.SaveChangesAsync();

        return food;
    }

    async Task<Food> IFoodService.Update(Food newFood)
    {
        var food = await dbContext.Foods.FindAsync(newFood.Id) ?? throw new EntityNotFoundException(nameof(Food));

        food.Description = newFood.Description;
        food.Price = newFood.Price;
        food.Category = newFood.Category;
        await dbContext.SaveChangesAsync();

        return food;
    }

    async Task<Food> IFoodService.ChangeImage(int id, Stream image)
    {
        var food = await dbContext.Foods.FindAsync(id) ?? throw new EntityNotFoundException(nameof(Food));

        using (image)
        {
            food.ImagePath = $"{food.Id}.jpg";
            await using var file = File.Create($"{BASE_IMAGE_PATH}{food.ImagePath}");
            await image.CopyToAsync(file);
            await dbContext.SaveChangesAsync();
        }

        return food;
    }

    async Task IFoodService.Delete(int id)
    {
        var food = await dbContext.Foods.FindAsync(id) ?? throw new EntityNotFoundException(nameof(Food));
        dbContext.Foods.Remove(food);
        await dbContext.SaveChangesAsync();
    }
}