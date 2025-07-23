using food_service.Models;

namespace food_service.ServiceInterfaces;

public interface IFoodService
{
    Task<ICollection<Food>> GetAll();

    Task<Food?> Get(int id);

    Task<Stream> GetImage(int id);

    Task<Food> Create(Food food);

    Task<Food> Update(Food newFood);

    Task<Food> ChangeImage(int id, Stream image);

    Task Delete(int id);
}