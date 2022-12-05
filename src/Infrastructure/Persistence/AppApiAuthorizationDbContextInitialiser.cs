using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using new_usaha.Infrastructure.Identity;
using new_usaha.Infrastructure.Seeder;

namespace new_usaha.Infrastructure.Persistence;

public class AppApiAuthorizationDbContextInitialiser
{
    private readonly ILogger<AppApiAuthorizationDbContextInitialiser> _logger;
    private readonly AppIdentityDbContext _auth_context;
    private readonly UserManager<ApplicationUser> _userManager;

    public AppApiAuthorizationDbContextInitialiser(
        ILogger<AppApiAuthorizationDbContextInitialiser> logger, 
        AppIdentityDbContext context,
        UserManager<ApplicationUser> userManager)
    {
        _logger = logger;
        _auth_context = context;
        _userManager = userManager;
    }

    public async Task InitialiseAsync()
    {
        try
        {

            //if (_auth_context.Database.IsSqlServer())
            //{
            await _auth_context.Database.MigrateAsync();
            //}

        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while initialising the database.");
            throw;
        }
    }

    public async Task SeedAsync()
    {
        try
        {
            await TrySeedAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while seeding the database.");
            throw;
        }
    }

    public async Task TrySeedAsync()
    {
        await AppIdentityDbContextSeed.SeedDefaultUserAsync(_userManager);

        //await AppConfigurationDbContextSeed.SeedIdentityResource(_auth_context);
        //await AppConfigurationDbContextSeed.SeedApiResoureces(_auth_context);
        //await AppConfigurationDbContextSeed.SeedApiScope(_auth_context);
        //await AppConfigurationDbContextSeed.SeedApiResouceScope(_auth_context);
        //await AppConfigurationDbContextSeed.SeedClient(_auth_context);
    }
}
