using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace user_service.Migrations
{
    /// <inheritdoc />
    public partial class RenameDbContext : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "kitchen-id-1",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "24883c84-99f6-460e-b9cc-0d043476f11e", "612236c3-dfa3-45af-b4f6-fb6e2eac037e" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "waiter-id-1",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "ad48bc65-1168-4f58-b95c-23ee3424a139", "fbce742d-da06-46db-b1fe-c80490bbd587" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "kitchen-id-1",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "edcdd1b6-a862-4d67-889b-3dce4f821b4d", "3f878eaa-8900-495c-97a4-457f58a12b6a" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "waiter-id-1",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "09e56dbe-8cd2-48f7-ab90-5c1b179d2952", "e8f05f54-1516-4400-9452-bcee0b818b34" });
        }
    }
}
