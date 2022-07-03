using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace new_usaha.Infrastructure.Migrations.ApplicationDb
{
    public partial class alterenterpriseemployee : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserName",
                table: "EnterpriseEmployees",
                type: "varchar(255)",
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserName",
                table: "EnterpriseEmployees");
        }
    }
}
