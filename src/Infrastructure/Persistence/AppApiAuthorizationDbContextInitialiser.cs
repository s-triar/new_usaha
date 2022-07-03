using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using new_usaha.Infrastructure.Seeder;

namespace new_usaha.Infrastructure.Persistence;

public class AppApiAuthorizationDbContextInitialiser
{
    private readonly ILogger<AppApiAuthorizationDbContextInitialiser> _logger;
    private readonly AppApiAuthorizationDbContext _auth_context;

    public AppApiAuthorizationDbContextInitialiser(ILogger<AppApiAuthorizationDbContextInitialiser> logger, AppApiAuthorizationDbContext context)
    {
        _logger = logger;
        _auth_context = context;
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
        await AppConfigurationDbContextSeed.SeedIdentityResource(_auth_context);
        await AppConfigurationDbContextSeed.SeedApiResoureces(_auth_context);
        await AppConfigurationDbContextSeed.SeedApiScope(_auth_context);
        await AppConfigurationDbContextSeed.SeedApiResouceScope(_auth_context);
        await AppConfigurationDbContextSeed.SeedClient(_auth_context);
    }
}
