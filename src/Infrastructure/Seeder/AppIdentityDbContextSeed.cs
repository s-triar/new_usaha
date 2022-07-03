using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using new_usaha.Infrastructure.Identity;

namespace new_usaha.Infrastructure.Seeder;

public static class AppIdentityDbContextSeed
{
    public static async Task SeedDefaultUserAsync(UserManager<ApplicationUser> userManager)
    {
        var defaultUser = new ApplicationUser { UserName = "admin@localhost.com", Email = "admin@localhost.com" };

        if (userManager.Users.All(u => u.UserName != defaultUser.UserName))
        {
            await userManager.CreateAsync(defaultUser, "qweasd");
        }
    }
}
