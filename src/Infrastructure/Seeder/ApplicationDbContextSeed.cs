using new_usaha.Domain.Entities;
using new_usaha.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using System.Linq;
using System.Threading.Tasks;
using System;
using new_usaha.Domain.Enums;
using Microsoft.EntityFrameworkCore;
using new_usaha.Infrastructure.Persistence;
using System.Text.Json;

namespace new_usaha.Infrastructure.Seeder;

public static class ApplicationDbContextSeed
{
    public static async Task SeedOrderStatusAsync(ApplicationDbContext context)
    {
        
        // Seed, if necessary
        if (!context.OrderStatuses.Any())
        {
            context.OrderStatuses.AddRange(
                new OrderStatus
                {
                    Id = 1,
                    Name = "Bayar",
                    NoQueue = 1,
                    CreatedBy = "Seeder",
                    CreatedAt = DateTime.UtcNow
                },
                new OrderStatus
                {
                    Id = 2,
                    Name = "Proses",
                    NoQueue = 2,
                    CreatedBy = "Seeder",
                    CreatedAt = DateTime.UtcNow
                },
                new OrderStatus
                {
                    Id = 3,
                    Name = "Diantar",
                    NoQueue = 3,
                    CreatedBy = "Seeder",
                    CreatedAt = DateTime.UtcNow
                },
                new OrderStatus
                {
                    Id = 4,
                    Name = "Diterima",
                    NoQueue = 4,
                    CreatedBy = "Seeder",
                    CreatedAt = DateTime.UtcNow
                },
                new OrderStatus
                {
                    Id = 5,
                    Name = "Selesai",
                    NoQueue = 5,
                    CreatedBy = "Seeder",
                    CreatedAt = DateTime.UtcNow
                }
            );
            await context.SaveChangesAsync();
        }
    }
    public static async Task SeedPaymentMethodsAsync(ApplicationDbContext context)
    {
        // Seed, if necessary
        if (!context.PaymentMethods.Any())
        {
            context.PaymentMethods.AddRange(
            new PaymentMethod
            {
                Id = 1,
                Name = "Cash",
                CreatedBy = "Seeder",
                CreatedAt = DateTime.UtcNow
            }
            );
            await context.SaveChangesAsync();
        }
    }
    public static async Task SeedEnterpriseTypesAsync(ApplicationDbContext context)
    {
        // Seed, if necessary
        if (!context.EnterpriseTypes.Any())
        {
            context.EnterpriseTypes.AddRange(
            new EnterpriseType
            {
                Name = "Toko",
                CreatedBy = "Seeder",
                Provide = ProvideType.Barang,
                CreatedAt = DateTime.UtcNow
            },
            new EnterpriseType
            {
                Name = "Cafe",
                CreatedBy = "Seeder",
                Provide = ProvideType.Barang,
                CreatedAt = DateTime.UtcNow
            },
            new EnterpriseType
            {
                Name = "Stall",
                CreatedBy = "Seeder",
                Provide = ProvideType.Barang,
                CreatedAt = DateTime.UtcNow
            }
            );
            await context.SaveChangesAsync();
        }
    }
    public static async Task SeedGoodTypesAsync(ApplicationDbContext context)
    {
        
        string text = File.ReadAllText("GoodsTypesSeed.json");
        var ob = JsonSerializer.Deserialize<List<GoodsTypesJSONModel>>(text)!;
        foreach (var o in ob)
        {
            var check = context.GoodsTypes.Any(x => x.Id == o.Id);
            if (!check)
            {
                context.GoodsTypes.Add(
                    new GoodsType
                    {
                        Id = o.Id,
                        Name = o.Name,
                        ParentGoodsTypeId = o.ParentGoodsTypeId,
                        CreatedBy = "Seeder",
                        CreatedAt = DateTime.UtcNow
                    }
                );
            }
            await SeedGoodTypesChildrenAsync(context, o);

        }
        await context.SaveChangesAsync();   
    }
    private static async Task SeedGoodTypesChildrenAsync(ApplicationDbContext context, GoodsTypesJSONModel o )
    {
        foreach (var oc in o.Children)
        {
            var check = context.GoodsTypes.Any(x => x.Id == oc.Id);
            if (!check)
            {
                context.GoodsTypes.Add(
                    new GoodsType
                    {
                        Id = oc.Id,
                        Name = oc.Name,
                        ParentGoodsTypeId = oc.ParentGoodsTypeId,
                        CreatedBy = "Seeder",
                        CreatedAt = DateTime.UtcNow
                    }
                );
            }
            foreach (var occ in oc.Children)
            {
                await SeedGoodTypesChildrenAsync(context, occ);
            }
        }

    }

    public static async Task SeedSampleDataAsync(ApplicationDbContext context)
    {
        // Seed, if necessary
        //if (!context.TodoLists.Any())
        //{
        //    context.TodoLists.Add(new TodoList
        //    {
        //        Title = "Shopping",
        //        Items =
        //            {
        //                new TodoItem { Title = "Apples", Done = true },
        //                new TodoItem { Title = "Milk", Done = true },
        //                new TodoItem { Title = "Bread", Done = true },
        //                new TodoItem { Title = "Toilet paper" },
        //                new TodoItem { Title = "Pasta" },
        //                new TodoItem { Title = "Tissues" },
        //                new TodoItem { Title = "Tuna" },
        //                new TodoItem { Title = "Water" }
        //            }
        //    });

        //    await context.SaveChangesAsync();
        //}
    }
}
public class GoodsTypesJSONModel
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int? ParentGoodsTypeId { get; set; }
    public List<GoodsTypesJSONModel> Children { get; set; }
}
