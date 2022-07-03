using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace new_usaha.Infrastructure.Migrations.ApplicationDb
{
    public partial class addenterpriseroletoenterpriseemployeeandemployeejoin : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "EnterpriseRoleId",
                table: "EnterpriseEmployees",
                type: "char(36)",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                collation: "ascii_general_ci");

            migrationBuilder.CreateTable(
                name: "EmployeeJoins",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    EnterpriseId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    EnterpriseRoleId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    UserId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Code = table.Column<int>(type: "int", nullable: false),
                    ExpiredTime = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    IsUsed = table.Column<bool>(type: "tinyint(1)", nullable: false),
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
                    table.PrimaryKey("PK_EmployeeJoins", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeeJoins_EnterpriseRoles_EnterpriseRoleId",
                        column: x => x.EnterpriseRoleId,
                        principalTable: "EnterpriseRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EmployeeJoins_Enterprises_EnterpriseId",
                        column: x => x.EnterpriseId,
                        principalTable: "Enterprises",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_EnterpriseEmployees_EnterpriseRoleId",
                table: "EnterpriseEmployees",
                column: "EnterpriseRoleId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeJoins_EnterpriseId",
                table: "EmployeeJoins",
                column: "EnterpriseId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeJoins_EnterpriseRoleId",
                table: "EmployeeJoins",
                column: "EnterpriseRoleId");

            migrationBuilder.AddForeignKey(
                name: "FK_EnterpriseEmployees_EnterpriseRoles_EnterpriseRoleId",
                table: "EnterpriseEmployees",
                column: "EnterpriseRoleId",
                principalTable: "EnterpriseRoles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EnterpriseEmployees_EnterpriseRoles_EnterpriseRoleId",
                table: "EnterpriseEmployees");

            migrationBuilder.DropTable(
                name: "EmployeeJoins");

            migrationBuilder.DropIndex(
                name: "IX_EnterpriseEmployees_EnterpriseRoleId",
                table: "EnterpriseEmployees");

            migrationBuilder.DropColumn(
                name: "EnterpriseRoleId",
                table: "EnterpriseEmployees");
        }
    }
}
