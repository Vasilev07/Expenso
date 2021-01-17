using Microsoft.EntityFrameworkCore.Migrations;

namespace ExpensoAPI.Migrations
{
    public partial class UpdateCreatedAtTypo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CratedAt",
                table: "Income",
                newName: "CreatedAt");

            migrationBuilder.RenameColumn(
                name: "CratedAt",
                table: "Expense",
                newName: "CreatedAt");

            migrationBuilder.RenameColumn(
                name: "CratedAt",
                table: "Category",
                newName: "CreatedAt");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "Income",
                newName: "CratedAt");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "Expense",
                newName: "CratedAt");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "Category",
                newName: "CratedAt");
        }
    }
}
