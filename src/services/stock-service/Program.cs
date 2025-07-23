using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.EntityFrameworkCore;
using stock_service.ServiceInterfaces;
using stock_service.Services;
using System.Text.Json.Serialization;
using stock_service.Database;

namespace stock_service
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddCors(options =>
            {
                options.AddDefaultPolicy(policy =>
                {
                    policy.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader();
                });
            });

            builder.Services.AddControllers(options =>
            {
                // to give back null instead of 204
                options.OutputFormatters.RemoveType<HttpNoContentOutputFormatter>();
            })
            .AddJsonOptions(opts =>
            {
                opts.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
            });

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddDbContext<StockDbContext>(opts => opts
                .UseSqlServer(
                    builder.Configuration.GetConnectionString("DefaultConnection"),
                    options => options.EnableRetryOnFailure()
                )
            );

            builder.Services.AddAutoMapper(typeof(DtoMapperProfile));

            builder.Services.AddTransient<IStockService, StockService>();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                // Run migration every time as dbContext is recreated
                using (var scope = app.Services.CreateScope())
                {
                    var dbContext = scope.ServiceProvider.GetRequiredService<StockDbContext>();
                    dbContext.Database.EnsureDeleted();
                    dbContext.Database.Migrate();
                }

                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UsePathBase("/api");
            app.UseRouting();
            app.UseCors();

            //app.UseAuthentication();
            //app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
