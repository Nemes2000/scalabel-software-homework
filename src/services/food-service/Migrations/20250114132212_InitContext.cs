using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace food_service.Migrations
{
    /// <inheritdoc />
    public partial class InitContext : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Foods",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    ImagePath = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    Price = table.Column<int>(type: "int", nullable: false),
                    Category = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Foods", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Foods",
                columns: new[] { "Id", "Category", "Description", "ImagePath", "Name", "Price" },
                values: new object[,]
                {
                    { 1, 1, "Juicy beef patty, cheddar, lettuce, tomato, pickles, and house sauce on a brioche bun.", "1.jpg", "Burger", 1500 },
                    { 2, 1, "Al dente pasta in creamy garlic sauce with sun-dried tomatoes, spinach, and Parmesan.", "2.jpg", "Pasta", 1200 },
                    { 3, 0, "Roasted tomatoes blended with fresh basil and cream, served with crispy grilled cheese croutons.", "3.jpg", "Soup", 1000 },
                    { 4, 1, "Fresh greens, olives, feta, cucumbers, and tomatoes with lemon-oregano vinaigrette.", "4.jpg", "Salad", 800 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Foods");
        }
    }
}
