using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace workday_service.Migrations
{
    /// <inheritdoc />
    public partial class InitContext : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Workdays",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IsOpen = table.Column<bool>(type: "bit", nullable: false),
                    Date = table.Column<DateOnly>(type: "date", nullable: false),
                    OpeningTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ClosingTime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Workdays", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Workdays",
                columns: new[] { "Id", "ClosingTime", "Date", "IsOpen", "OpeningTime" },
                values: new object[,]
                {
                    { 1, new DateTime(2025, 1, 18, 17, 30, 0, 0, DateTimeKind.Local), new DateOnly(2025, 1, 18), true, new DateTime(2025, 1, 18, 8, 0, 0, 0, DateTimeKind.Local) },
                    { 2, new DateTime(2025, 1, 19, 17, 30, 0, 0, DateTimeKind.Local), new DateOnly(2025, 1, 19), true, new DateTime(2025, 1, 19, 8, 0, 0, 0, DateTimeKind.Local) },
                    { 3, new DateTime(2025, 1, 21, 16, 0, 0, 0, DateTimeKind.Local), new DateOnly(2025, 1, 21), true, new DateTime(2025, 1, 21, 8, 0, 0, 0, DateTimeKind.Local) },
                    { 4, null, new DateOnly(2025, 1, 22), false, null }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Workdays");
        }
    }
}
