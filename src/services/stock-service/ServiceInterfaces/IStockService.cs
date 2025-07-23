using stock_service.Models;

namespace stock_service.ServiceInterfaces;

public interface IStockService
{
    Task<ICollection<Stock>> GetAll();

    Task<Stock?> Get(int id);

    Task<Stock> Create(Stock stock);

    Task<bool> Update(int stockId, int newAmount);

    Task Delete(int id);
}
