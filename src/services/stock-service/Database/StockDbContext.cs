using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.Text.Json;
using stock_service.ServiceInterfaces;
using stock_service.Models;

namespace stock_service.Database;

public class StockDbContext : DbContext
{
    public StockDbContext(DbContextOptions<StockDbContext> options) : base(options) {}

    public DbSet<Stock> Stocks => Set<Stock>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<Stock>().HasData(
            new Stock { Id = 1, Name = "Burgonya", Amount = 40, Unit = QuantityUnit.Kilogram },
            new Stock { Id = 2, Name = "Olaj", Amount = 3, Unit = QuantityUnit.Liter },
            new Stock { Id = 3, Name = "Csirkemell filé", Amount = 25, Unit = QuantityUnit.Piece },
            new Stock { Id = 4, Name = "Bors", Amount = 150, Unit = QuantityUnit.Gram },
            new Stock { Id = 5, Name = "Csípős szósz", Amount = 400, Unit = QuantityUnit.Milliliter }
        );

        base.OnModelCreating(builder);
    }
}
