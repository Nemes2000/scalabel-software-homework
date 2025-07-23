
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using workday_service.Clients;
using workday_service.Database;
using workday_service.ServiceInterfaces;
using workday_service.Services;

namespace workday_service
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

            builder.Services.AddDbContext<WorkdayDbContext>(opts => opts
                .UseSqlServer(
                    builder.Configuration.GetConnectionString("DefaultConnection"),
                    options => options.EnableRetryOnFailure()
                )
            );

            builder.Services.AddAutoMapper(typeof(DtoMapperProfile));

            builder.Services.AddTransient<IWorkdayService, WorkdayService>();

            builder.Services.AddHttpClient<ScheduleClient>(client =>
            {
                client.BaseAddress = new Uri("http://schedule-service:5005/");
                client.DefaultRequestHeaders.Add("Accept", "application/json");
            });
            builder.Services.AddHttpClient<UserClient>(client =>
            {
                client.BaseAddress = new Uri("http://user-service:5001/");
                client.DefaultRequestHeaders.Add("Accept", "application/json");
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                // Run migration every time as dbContext is recreated
                using (var scope = app.Services.CreateScope())
                {
                    var dbContext = scope.ServiceProvider.GetRequiredService<WorkdayDbContext>();
                    dbContext.Database.EnsureDeleted();
                    dbContext.Database.Migrate();
                }

                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UsePathBase("/api");
            app.UseRouting();
            app.UseCors();

            app.MapControllers();

            app.Run();
        }
    }
}
