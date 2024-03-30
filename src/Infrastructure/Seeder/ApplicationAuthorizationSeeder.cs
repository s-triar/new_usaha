using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using new_usaha.Application.Common.Models;
using new_usaha.Domain.Entities;
using new_usaha.Infrastructure.Persistence;

namespace new_usaha.Infrastructure.Seeder;

public static class ApplicationAuthorizationSeeder
{
    public static async Task SeedEnterpriseClaimAsync(ApplicationDbContext context)
    {
        string text = File.ReadAllText("claim.json");
        var ob = JsonSerializer.Deserialize<List<EnterpriseClaimModel>>(text)!;
        // Seed, if necessary
        foreach (var o in ob)
        {
            var check = context.EnterpriseClaims.Include(x => x.EnterpriseType)
                               .Any(x => x.EnterpriseType.Name == o.EnterpriseType &&
                                         x.Context == o.Context &&
                                         x.Feature == o.Feature &&
                                         x.Action == o.Action
                               );
            if (!check)
            {
                var enterpriseType = await context.EnterpriseTypes.FirstOrDefaultAsync(x => x.Name == o.EnterpriseType);
                context.EnterpriseClaims.Add(
                    new EnterpriseClaim
                    {
                        EnterpriseTypeId = enterpriseType!.Id,
                        Context = o.Context!,
                        Feature = o.Feature!,
                        Action = o.Action!,
                        Description = o.Description!,
                        CreatedBy = "Seeder",
                        CreatedAt = DateTime.UtcNow
                    }
                );
            }
        }
        await context.SaveChangesAsync();
    }
}
