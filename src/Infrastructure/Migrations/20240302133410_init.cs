using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace new_usaha.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "EmployeeScheduleTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "varchar(255)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    LastModifiedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    DeletedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeScheduleTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EnterpriseTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "varchar(255)", nullable: false),
                    Provide = table.Column<string>(type: "varchar(255)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    LastModifiedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    DeletedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EnterpriseTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "GoodsTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "varchar(255)", nullable: false),
                    ParentGoodsTypeId = table.Column<int>(type: "integer", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    LastModifiedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    DeletedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GoodsTypes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GoodsTypes_GoodsTypes_ParentGoodsTypeId",
                        column: x => x.ParentGoodsTypeId,
                        principalTable: "GoodsTypes",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "OrderStatuses",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "varchar(255)", nullable: false),
                    NoQueue = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    LastModifiedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    DeletedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderStatuses", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PaymentMethods",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "varchar(255)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    LastModifiedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    DeletedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PaymentMethods", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EnterpriseClaims",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    EnterpriseTypeId = table.Column<int>(type: "integer", nullable: false),
                    Context = table.Column<string>(type: "varchar(255)", nullable: false),
                    Feature = table.Column<string>(type: "varchar(255)", nullable: false),
                    Action = table.Column<string>(type: "varchar(255)", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    LastModifiedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    DeletedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EnterpriseClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EnterpriseClaims_EnterpriseTypes_EnterpriseTypeId",
                        column: x => x.EnterpriseTypeId,
                        principalTable: "EnterpriseTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Enterprises",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "varchar(255)", nullable: false),
                    Code = table.Column<string>(type: "varchar(255)", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    EnterpriseTypeId = table.Column<int>(type: "integer", nullable: false),
                    UserOwnerId = table.Column<string>(type: "varchar(255)", nullable: false),
                    Photo = table.Column<string>(type: "varchar(255)", nullable: true),
                    Phone = table.Column<string>(type: "varchar(255)", nullable: false),
                    Email = table.Column<string>(type: "varchar(255)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    LastModifiedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    DeletedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Enterprises", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Enterprises_EnterpriseTypes_EnterpriseTypeId",
                        column: x => x.EnterpriseTypeId,
                        principalTable: "EnterpriseTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EmployeePresenceCodes",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Code = table.Column<string>(type: "varchar(255)", nullable: false),
                    UserName = table.Column<string>(type: "varchar(255)", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    EnterpriseId = table.Column<Guid>(type: "uuid", nullable: false),
                    IsValid = table.Column<bool>(type: "boolean", nullable: false),
                    Tries = table.Column<long>(type: "bigint", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    LastModifiedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    DeletedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeePresenceCodes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeePresenceCodes_Enterprises_EnterpriseId",
                        column: x => x.EnterpriseId,
                        principalTable: "Enterprises",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EnterpriseAddresses",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    EnterpriseId = table.Column<Guid>(type: "uuid", nullable: false),
                    Street = table.Column<string>(type: "varchar(255)", nullable: false),
                    SubDistrict = table.Column<string>(type: "varchar(255)", nullable: false),
                    District = table.Column<string>(type: "varchar(255)", nullable: false),
                    City = table.Column<string>(type: "varchar(255)", nullable: false),
                    Province = table.Column<string>(type: "varchar(255)", nullable: false),
                    PostalCode = table.Column<string>(type: "varchar(255)", nullable: false),
                    Latitude = table.Column<decimal>(type: "numeric(18,4)", nullable: false),
                    Longitude = table.Column<decimal>(type: "numeric(18,4)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EnterpriseAddresses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EnterpriseAddresses_Enterprises_EnterpriseId",
                        column: x => x.EnterpriseId,
                        principalTable: "Enterprises",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EnterpriseRoles",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    EnterpriseId = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "varchar(255)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    LastModifiedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    DeletedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EnterpriseRoles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EnterpriseRoles_Enterprises_EnterpriseId",
                        column: x => x.EnterpriseId,
                        principalTable: "Enterprises",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EnterpriseShifts",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    EnterpriseId = table.Column<Guid>(type: "uuid", nullable: false),
                    Start = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    End = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Number = table.Column<long>(type: "bigint", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    LastModifiedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    DeletedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EnterpriseShifts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EnterpriseShifts_Enterprises_EnterpriseId",
                        column: x => x.EnterpriseId,
                        principalTable: "Enterprises",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Goodses",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    EnterpriseId = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "varchar(255)", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    GoodsTypeId = table.Column<int>(type: "integer", nullable: false),
                    Barcode = table.Column<string>(type: "varchar(255)", nullable: false),
                    AvailableOnline = table.Column<bool>(type: "boolean", nullable: false),
                    Contain = table.Column<int>(type: "integer", nullable: false),
                    IsWholesalerPriceAuto = table.Column<bool>(type: "boolean", nullable: false),
                    ParentGoodsId = table.Column<Guid>(type: "uuid", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    LastModifiedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    DeletedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Goodses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Goodses_Enterprises_EnterpriseId",
                        column: x => x.EnterpriseId,
                        principalTable: "Enterprises",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Goodses_GoodsTypes_GoodsTypeId",
                        column: x => x.GoodsTypeId,
                        principalTable: "GoodsTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Goodses_Goodses_ParentGoodsId",
                        column: x => x.ParentGoodsId,
                        principalTable: "Goodses",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "GoodsGroups",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    EnterpriseId = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "varchar(255)", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    LastModifiedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    DeletedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GoodsGroups", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GoodsGroups_Enterprises_EnterpriseId",
                        column: x => x.EnterpriseId,
                        principalTable: "Enterprises",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    EnterpriseId = table.Column<Guid>(type: "uuid", nullable: false),
                    Total = table.Column<decimal>(type: "numeric(18,4)", nullable: false),
                    Payment = table.Column<decimal>(type: "numeric(18,4)", nullable: false),
                    Return = table.Column<decimal>(type: "numeric(18,4)", nullable: false),
                    PaymentMethodId = table.Column<long>(type: "bigint", nullable: false),
                    IsOnline = table.Column<bool>(type: "boolean", nullable: false),
                    UserOrderId = table.Column<Guid>(type: "uuid", nullable: true),
                    To = table.Column<string>(type: "varchar(255)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    LastModifiedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    DeletedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Orders_Enterprises_EnterpriseId",
                        column: x => x.EnterpriseId,
                        principalTable: "Enterprises",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Orders_PaymentMethods_PaymentMethodId",
                        column: x => x.PaymentMethodId,
                        principalTable: "PaymentMethods",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EmployeeJoins",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    EnterpriseId = table.Column<Guid>(type: "uuid", nullable: false),
                    EnterpriseRoleId = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<string>(type: "varchar(255)", nullable: false),
                    Code = table.Column<int>(type: "integer", nullable: false),
                    ExpiredTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    IsUsed = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    LastModifiedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    DeletedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
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
                });

            migrationBuilder.CreateTable(
                name: "EnterpriseEmployees",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    EnterpriseId = table.Column<Guid>(type: "uuid", nullable: false),
                    EnterpriseRoleId = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<string>(type: "varchar(255)", nullable: false),
                    UserName = table.Column<string>(type: "varchar(255)", nullable: false),
                    Status = table.Column<string>(type: "varchar(255)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    LastModifiedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    DeletedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EnterpriseEmployees", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EnterpriseEmployees_EnterpriseRoles_EnterpriseRoleId",
                        column: x => x.EnterpriseRoleId,
                        principalTable: "EnterpriseRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EnterpriseEmployees_Enterprises_EnterpriseId",
                        column: x => x.EnterpriseId,
                        principalTable: "Enterprises",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EnterpriseRoleClaims",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    EnterpriseRoleId = table.Column<Guid>(type: "uuid", nullable: false),
                    EnterpriseClaimId = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    LastModifiedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    DeletedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EnterpriseRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EnterpriseRoleClaims_EnterpriseClaims_EnterpriseClaimId",
                        column: x => x.EnterpriseClaimId,
                        principalTable: "EnterpriseClaims",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EnterpriseRoleClaims_EnterpriseRoles_EnterpriseRoleId",
                        column: x => x.EnterpriseRoleId,
                        principalTable: "EnterpriseRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "GoodsAdjustments",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    GoodsId = table.Column<Guid>(type: "uuid", nullable: false),
                    DeltaStock = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    LastModifiedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    DeletedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GoodsAdjustments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GoodsAdjustments_Goodses_GoodsId",
                        column: x => x.GoodsId,
                        principalTable: "Goodses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "GoodsPhotos",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    GoodsId = table.Column<Guid>(type: "uuid", nullable: false),
                    Url = table.Column<string>(type: "varchar(255)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    LastModifiedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    DeletedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GoodsPhotos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GoodsPhotos_Goodses_GoodsId",
                        column: x => x.GoodsId,
                        principalTable: "Goodses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "GoodsPrices",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    GoodsId = table.Column<Guid>(type: "uuid", nullable: false),
                    Price = table.Column<decimal>(type: "numeric(18,4)", nullable: false),
                    Start = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    End = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    LastModifiedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    DeletedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GoodsPrices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GoodsPrices_Goodses_GoodsId",
                        column: x => x.GoodsId,
                        principalTable: "Goodses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "GoodsStocks",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    GoodsId = table.Column<Guid>(type: "uuid", nullable: false),
                    N = table.Column<int>(type: "integer", nullable: false),
                    Threshold = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GoodsStocks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GoodsStocks_Goodses_GoodsId",
                        column: x => x.GoodsId,
                        principalTable: "Goodses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "GoodsWholesalePrices",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    GoodsId = table.Column<Guid>(type: "uuid", nullable: false),
                    WholesalerPrice = table.Column<decimal>(type: "numeric(18,4)", nullable: false),
                    WholesalerMin = table.Column<int>(type: "integer", nullable: false),
                    Start = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    End = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    LastModifiedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    DeletedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
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
                });

            migrationBuilder.CreateTable(
                name: "Profit",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    GoodsId = table.Column<Guid>(type: "uuid", nullable: false),
                    Value = table.Column<int>(type: "integer", nullable: false),
                    Reason = table.Column<string>(type: "varchar(255)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    LastModifiedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    DeletedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Profit", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Profit_Goodses_GoodsId",
                        column: x => x.GoodsId,
                        principalTable: "Goodses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "GoodsGroupMembers",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    GoodsGroupId = table.Column<Guid>(type: "uuid", nullable: false),
                    GoodsId = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    LastModifiedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    DeletedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GoodsGroupMembers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GoodsGroupMembers_GoodsGroups_GoodsGroupId",
                        column: x => x.GoodsGroupId,
                        principalTable: "GoodsGroups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GoodsGroupMembers_Goodses_GoodsId",
                        column: x => x.GoodsId,
                        principalTable: "Goodses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "GoodsOrdereds",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    OrderId = table.Column<Guid>(type: "uuid", nullable: false),
                    GoodsId = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "varchar(255)", nullable: false),
                    IsWholesalerPrice = table.Column<bool>(type: "boolean", nullable: false),
                    DiscountItem = table.Column<decimal>(type: "numeric(18,4)", nullable: false),
                    DiscountItemTotal = table.Column<decimal>(type: "numeric(18,4)", nullable: false),
                    PricePerItem = table.Column<decimal>(type: "numeric(18,4)", nullable: false),
                    PricePerItemAfterDiscount = table.Column<decimal>(type: "numeric(18,4)", nullable: false),
                    PriceTotal = table.Column<decimal>(type: "numeric(18,4)", nullable: false),
                    PriceTotalAfterDiscount = table.Column<decimal>(type: "numeric(18,4)", nullable: false),
                    PriceTotalFinal = table.Column<decimal>(type: "numeric(18,4)", nullable: false),
                    N = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GoodsOrdereds", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GoodsOrdereds_Goodses_GoodsId",
                        column: x => x.GoodsId,
                        principalTable: "Goodses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GoodsOrdereds_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrderProgresses",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    OrderId = table.Column<Guid>(type: "uuid", nullable: false),
                    OrderStatusId = table.Column<long>(type: "bigint", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    LastModifiedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    DeletedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderProgresses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrderProgresses_OrderStatuses_OrderStatusId",
                        column: x => x.OrderStatusId,
                        principalTable: "OrderStatuses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderProgresses_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EmployeePresences",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    EnterpriseEmployeeId = table.Column<Guid>(type: "uuid", nullable: false),
                    Status = table.Column<string>(type: "varchar(255)", nullable: false),
                    EmployeePresenceCode_Start_Id = table.Column<Guid>(type: "uuid", nullable: false),
                    EmployeePresenceCode_StartId = table.Column<Guid>(type: "uuid", nullable: false),
                    EmployeePresenceCode_End_Id = table.Column<Guid>(type: "uuid", nullable: false),
                    EmployeePresenceCode_EndId = table.Column<Guid>(type: "uuid", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    Approval = table.Column<bool>(type: "boolean", nullable: false),
                    ApprovalDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    UserApproverId = table.Column<string>(type: "varchar(255)", nullable: true),
                    NumberHours = table.Column<long>(type: "bigint", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    LastModifiedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    DeletedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeePresences", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeePresences_EmployeePresenceCodes_EmployeePresenceCod~",
                        column: x => x.EmployeePresenceCode_EndId,
                        principalTable: "EmployeePresenceCodes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EmployeePresences_EmployeePresenceCodes_EmployeePresenceCo~1",
                        column: x => x.EmployeePresenceCode_StartId,
                        principalTable: "EmployeePresenceCodes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EmployeePresences_EnterpriseEmployees_EnterpriseEmployeeId",
                        column: x => x.EnterpriseEmployeeId,
                        principalTable: "EnterpriseEmployees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EmployeeSchedules",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    EnterpriseEmployeeId = table.Column<decimal>(type: "numeric(20,0)", nullable: false),
                    EnterpriseEmployeeId1 = table.Column<Guid>(type: "uuid", nullable: false),
                    Schedule = table.Column<string>(type: "varchar(255)", nullable: false),
                    EmployeeScheduleTypeId = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    LastModifiedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    DeletedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeSchedules", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeeSchedules_EmployeeScheduleTypes_EmployeeScheduleTyp~",
                        column: x => x.EmployeeScheduleTypeId,
                        principalTable: "EmployeeScheduleTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EmployeeSchedules_EnterpriseEmployees_EnterpriseEmployeeId1",
                        column: x => x.EnterpriseEmployeeId1,
                        principalTable: "EnterpriseEmployees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EnterpriseEmployeeRoles",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    EnterpriseRoleId = table.Column<Guid>(type: "uuid", nullable: false),
                    EnterpriseEmployeeId = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    LastModifiedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    DeletedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EnterpriseEmployeeRoles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EnterpriseEmployeeRoles_EnterpriseEmployees_EnterpriseEmplo~",
                        column: x => x.EnterpriseEmployeeId,
                        principalTable: "EnterpriseEmployees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EnterpriseEmployeeRoles_EnterpriseRoles_EnterpriseRoleId",
                        column: x => x.EnterpriseRoleId,
                        principalTable: "EnterpriseRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AddStockHistories",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    GoodsStockId = table.Column<Guid>(type: "uuid", nullable: false),
                    N = table.Column<int>(type: "integer", nullable: false),
                    PriceChange = table.Column<decimal>(type: "numeric(18,4)", nullable: false),
                    BasePrice = table.Column<decimal>(type: "numeric(18,4)", nullable: false),
                    PricePerItem = table.Column<decimal>(type: "numeric(18,4)", nullable: false),
                    PriceTotal = table.Column<decimal>(type: "numeric(18,4)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    LastModifiedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    DeletedBy = table.Column<string>(type: "varchar(255)", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AddStockHistories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AddStockHistories_GoodsStocks_GoodsStockId",
                        column: x => x.GoodsStockId,
                        principalTable: "GoodsStocks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AddStockHistories_GoodsStockId",
                table: "AddStockHistories",
                column: "GoodsStockId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeJoins_EnterpriseId",
                table: "EmployeeJoins",
                column: "EnterpriseId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeJoins_EnterpriseRoleId",
                table: "EmployeeJoins",
                column: "EnterpriseRoleId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeePresenceCodes_EnterpriseId",
                table: "EmployeePresenceCodes",
                column: "EnterpriseId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeePresences_EmployeePresenceCode_EndId",
                table: "EmployeePresences",
                column: "EmployeePresenceCode_EndId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeePresences_EmployeePresenceCode_StartId",
                table: "EmployeePresences",
                column: "EmployeePresenceCode_StartId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeePresences_EnterpriseEmployeeId",
                table: "EmployeePresences",
                column: "EnterpriseEmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeSchedules_EmployeeScheduleTypeId",
                table: "EmployeeSchedules",
                column: "EmployeeScheduleTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeSchedules_EnterpriseEmployeeId1",
                table: "EmployeeSchedules",
                column: "EnterpriseEmployeeId1");

            migrationBuilder.CreateIndex(
                name: "IX_EnterpriseAddresses_EnterpriseId",
                table: "EnterpriseAddresses",
                column: "EnterpriseId");

            migrationBuilder.CreateIndex(
                name: "IX_EnterpriseClaims_EnterpriseTypeId",
                table: "EnterpriseClaims",
                column: "EnterpriseTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_EnterpriseEmployeeRoles_EnterpriseEmployeeId",
                table: "EnterpriseEmployeeRoles",
                column: "EnterpriseEmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_EnterpriseEmployeeRoles_EnterpriseRoleId",
                table: "EnterpriseEmployeeRoles",
                column: "EnterpriseRoleId");

            migrationBuilder.CreateIndex(
                name: "IX_EnterpriseEmployees_EnterpriseId",
                table: "EnterpriseEmployees",
                column: "EnterpriseId");

            migrationBuilder.CreateIndex(
                name: "IX_EnterpriseEmployees_EnterpriseRoleId",
                table: "EnterpriseEmployees",
                column: "EnterpriseRoleId");

            migrationBuilder.CreateIndex(
                name: "IX_EnterpriseRoleClaims_EnterpriseClaimId",
                table: "EnterpriseRoleClaims",
                column: "EnterpriseClaimId");

            migrationBuilder.CreateIndex(
                name: "IX_EnterpriseRoleClaims_EnterpriseRoleId",
                table: "EnterpriseRoleClaims",
                column: "EnterpriseRoleId");

            migrationBuilder.CreateIndex(
                name: "IX_EnterpriseRoles_EnterpriseId",
                table: "EnterpriseRoles",
                column: "EnterpriseId");

            migrationBuilder.CreateIndex(
                name: "IX_Enterprises_Code",
                table: "Enterprises",
                column: "Code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Enterprises_EnterpriseTypeId",
                table: "Enterprises",
                column: "EnterpriseTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_EnterpriseShifts_EnterpriseId",
                table: "EnterpriseShifts",
                column: "EnterpriseId");

            migrationBuilder.CreateIndex(
                name: "IX_GoodsAdjustments_GoodsId",
                table: "GoodsAdjustments",
                column: "GoodsId");

            migrationBuilder.CreateIndex(
                name: "IX_Goodses_EnterpriseId",
                table: "Goodses",
                column: "EnterpriseId");

            migrationBuilder.CreateIndex(
                name: "IX_Goodses_GoodsTypeId",
                table: "Goodses",
                column: "GoodsTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Goodses_ParentGoodsId",
                table: "Goodses",
                column: "ParentGoodsId");

            migrationBuilder.CreateIndex(
                name: "IX_GoodsGroupMembers_GoodsGroupId",
                table: "GoodsGroupMembers",
                column: "GoodsGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_GoodsGroupMembers_GoodsId",
                table: "GoodsGroupMembers",
                column: "GoodsId");

            migrationBuilder.CreateIndex(
                name: "IX_GoodsGroups_EnterpriseId",
                table: "GoodsGroups",
                column: "EnterpriseId");

            migrationBuilder.CreateIndex(
                name: "IX_GoodsOrdereds_GoodsId",
                table: "GoodsOrdereds",
                column: "GoodsId");

            migrationBuilder.CreateIndex(
                name: "IX_GoodsOrdereds_OrderId",
                table: "GoodsOrdereds",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_GoodsPhotos_GoodsId",
                table: "GoodsPhotos",
                column: "GoodsId");

            migrationBuilder.CreateIndex(
                name: "IX_GoodsPrices_GoodsId",
                table: "GoodsPrices",
                column: "GoodsId");

            migrationBuilder.CreateIndex(
                name: "IX_GoodsStocks_GoodsId",
                table: "GoodsStocks",
                column: "GoodsId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_GoodsTypes_ParentGoodsTypeId",
                table: "GoodsTypes",
                column: "ParentGoodsTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_GoodsWholesalePrices_GoodsId",
                table: "GoodsWholesalePrices",
                column: "GoodsId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderProgresses_OrderId",
                table: "OrderProgresses",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderProgresses_OrderStatusId",
                table: "OrderProgresses",
                column: "OrderStatusId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_EnterpriseId",
                table: "Orders",
                column: "EnterpriseId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_PaymentMethodId",
                table: "Orders",
                column: "PaymentMethodId");

            migrationBuilder.CreateIndex(
                name: "IX_Profit_GoodsId",
                table: "Profit",
                column: "GoodsId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AddStockHistories");

            migrationBuilder.DropTable(
                name: "EmployeeJoins");

            migrationBuilder.DropTable(
                name: "EmployeePresences");

            migrationBuilder.DropTable(
                name: "EmployeeSchedules");

            migrationBuilder.DropTable(
                name: "EnterpriseAddresses");

            migrationBuilder.DropTable(
                name: "EnterpriseEmployeeRoles");

            migrationBuilder.DropTable(
                name: "EnterpriseRoleClaims");

            migrationBuilder.DropTable(
                name: "EnterpriseShifts");

            migrationBuilder.DropTable(
                name: "GoodsAdjustments");

            migrationBuilder.DropTable(
                name: "GoodsGroupMembers");

            migrationBuilder.DropTable(
                name: "GoodsOrdereds");

            migrationBuilder.DropTable(
                name: "GoodsPhotos");

            migrationBuilder.DropTable(
                name: "GoodsPrices");

            migrationBuilder.DropTable(
                name: "GoodsWholesalePrices");

            migrationBuilder.DropTable(
                name: "OrderProgresses");

            migrationBuilder.DropTable(
                name: "Profit");

            migrationBuilder.DropTable(
                name: "GoodsStocks");

            migrationBuilder.DropTable(
                name: "EmployeePresenceCodes");

            migrationBuilder.DropTable(
                name: "EmployeeScheduleTypes");

            migrationBuilder.DropTable(
                name: "EnterpriseEmployees");

            migrationBuilder.DropTable(
                name: "EnterpriseClaims");

            migrationBuilder.DropTable(
                name: "GoodsGroups");

            migrationBuilder.DropTable(
                name: "OrderStatuses");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "Goodses");

            migrationBuilder.DropTable(
                name: "EnterpriseRoles");

            migrationBuilder.DropTable(
                name: "PaymentMethods");

            migrationBuilder.DropTable(
                name: "GoodsTypes");

            migrationBuilder.DropTable(
                name: "Enterprises");

            migrationBuilder.DropTable(
                name: "EnterpriseTypes");
        }
    }
}
