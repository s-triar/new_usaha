using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace new_usaha.Infrastructure.Migrations
{
    public partial class change : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsWholesalerPriceAuto",
                table: "GoodsPrices");

            migrationBuilder.DropColumn(
                name: "WholesalerMin",
                table: "GoodsPrices");

            migrationBuilder.DropColumn(
                name: "WholesalerPrice",
                table: "GoodsPrices");

            migrationBuilder.AddColumn<bool>(
                name: "IsWholesalerPriceAuto",
                table: "Goodses",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "GoodsWholesalePrices",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    GoodsId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    WholesalerPrice = table.Column<decimal>(type: "decimal(18,4)", nullable: false),
                    WholesalerMin = table.Column<int>(type: "int", nullable: false),
                    Start = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    End = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    CreatedBy = table.Column<string>(type: "varchar(255)", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    LastModifiedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "varchar(255)", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DeletedBy = table.Column<string>(type: "varchar(255)", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DeletedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GoodsWholesalePrices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GoodsWholesalePrices_Goodses_GoodsId",
                        column: x => x.GoodsId,
                        principalTable: "Goodses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_GoodsWholesalePrices_GoodsId",
                table: "GoodsWholesalePrices",
                column: "GoodsId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GoodsWholesalePrices");

            migrationBuilder.DropColumn(
                name: "IsWholesalerPriceAuto",
                table: "Goodses");

            migrationBuilder.AddColumn<bool>(
                name: "IsWholesalerPriceAuto",
                table: "GoodsPrices",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "WholesalerMin",
                table: "GoodsPrices",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<decimal>(
                name: "WholesalerPrice",
                table: "GoodsPrices",
                type: "decimal(18,4)",
                nullable: false,
                defaultValue: 0m);
        }
    }
}
