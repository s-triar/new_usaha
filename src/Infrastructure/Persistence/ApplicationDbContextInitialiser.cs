﻿using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using new_usaha.Infrastructure.Seeder;
using new_usaha.Domain.Entities;
using new_usaha.Infrastructure.Identity;
using new_usaha.Infrastructure.Seeder;

namespace new_usaha.Infrastructure.Persistence
{
    public class ApplicationDbContextInitialiser
    {
        private readonly ILogger<ApplicationDbContextInitialiser> _logger;
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        //private readonly RoleManager<IdentityRole> _roleManager;

        public ApplicationDbContextInitialiser(
            ILogger<ApplicationDbContextInitialiser> logger, 
            ApplicationDbContext context, 
            UserManager<ApplicationUser> userManager
            //, RoleManager<IdentityRole> roleManager
            )
        {
            _logger = logger;
            _context = context;
            _userManager = userManager;
            //_roleManager = roleManager;
        }

        public async Task InitialiseAsync()
        {
            try
            {
                //if (_context.Database.IsSqlServer())
                //{
                await _context.Database.MigrateAsync();
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
            await ApplicationDbContextSeed.SeedOrderStatusAsync(_context);
            await ApplicationDbContextSeed.SeedPaymentMethodsAsync(_context);
            await ApplicationDbContextSeed.SeedEnterpriseTypesAsync(_context);
            await ApplicationDbContextSeed.SeedGoodTypesAsync(_context);

            await ApplicationAuthorizationSeeder.SeedEnterpriseClaimAsync(_context);

            await AppIdentityDbContextSeed.SeedDefaultUserAsync(_userManager);
        }
    }
}