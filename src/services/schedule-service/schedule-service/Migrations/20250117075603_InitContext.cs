using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace schedule_service.Migrations
{
    /// <inheritdoc />
    public partial class InitContext : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Schedules",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    From = table.Column<DateTime>(type: "datetime2", nullable: false),
                    To = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EmployeeId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    WorkdayId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Schedules", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Schedules",
                columns: new[] { "Id", "EmployeeId", "From", "To", "WorkdayId" },
                values: new object[,]
                {
                    { 1, "waiter-id-1", new DateTime(2025, 1, 18, 8, 0, 0, 0, DateTimeKind.Local), new DateTime(2025, 1, 18, 17, 30, 0, 0, DateTimeKind.Local), 1 },
                    { 2, "kitchen-id-1", new DateTime(2025, 1, 18, 8, 0, 0, 0, DateTimeKind.Local), new DateTime(2025, 1, 18, 17, 30, 0, 0, DateTimeKind.Local), 1 },
                    { 3, "waiter-id-1", new DateTime(2025, 1, 19, 8, 0, 0, 0, DateTimeKind.Local), new DateTime(2025, 1, 19, 16, 0, 0, 0, DateTimeKind.Local), 2 },
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Schedules");
        }
    }
}
