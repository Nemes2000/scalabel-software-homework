using Microsoft.EntityFrameworkCore;
using stock_service.Database;
using stock_service.Exceptions;
using stock_service.Models;
using stock_service.ServiceInterfaces;

namespace stock_service.Services;

public class StockService(StockDbContext dbContext) : IStockService
{
    async Task<ICollection<Stock>> IStockService.GetAll()
    {
        return await dbContext.Stocks.ToListAsync();
    }

    async Task<Stock?> IStockService.Get(int id)
    {
        return await dbContext.Stocks.FindAsync(id);
    }

    async Task<Stock> IStockService.Create(Stock stock)
    {
        var nameCollision = await dbContext.Stocks.AnyAsync(t => t.Name == stock.Name);
        if (nameCollision)
        {
            throw new NameCollisionException(nameof(Stock).ToLower());
        }

        await dbContext.Stocks.AddAsync(stock);
        await dbContext.SaveChangesAsync();
        return stock;
    }

    async Task<bool> IStockService.Update(int stockId, int newAmount)
    {
        var stock = await dbContext.Stocks.FindAsync(stockId);
        if (stock == null)
        {
            return false;
        }

        stock.Amount = newAmount;
        await dbContext.SaveChangesAsync();
        return true;
    }

    async Task IStockService.Delete(int id)
    {
        var stock = await dbContext.Stocks.FindAsync(id) ?? throw new EntityNotFoundException(nameof(Stock));
        dbContext.Stocks.Remove(stock);
        await dbContext.SaveChangesAsync();
    }
}
