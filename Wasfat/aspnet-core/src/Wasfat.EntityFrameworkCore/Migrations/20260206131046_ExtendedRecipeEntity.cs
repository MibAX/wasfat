using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Wasfat.Migrations
{
    /// <inheritdoc />
    public partial class ExtendedRecipeEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "AppRecipes",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<bool>(
                name: "IsDisplayedInHero",
                table: "AppRecipes",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsFeatured",
                table: "AppRecipes",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "AppRecipes");

            migrationBuilder.DropColumn(
                name: "IsDisplayedInHero",
                table: "AppRecipes");

            migrationBuilder.DropColumn(
                name: "IsFeatured",
                table: "AppRecipes");
        }
    }
}
