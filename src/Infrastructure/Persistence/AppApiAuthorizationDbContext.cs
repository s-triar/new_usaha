using Duende.IdentityServer.EntityFramework.Entities;
using Duende.IdentityServer.EntityFramework.Interfaces;
using Duende.IdentityServer.EntityFramework.Options;
using Duende.IdentityServer.Models;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using new_usaha.Application.Common.Interfaces;
using new_usaha.Infrastructure.Identity;

namespace new_usaha.Infrastructure.Persistence;

public class AppApiAuthorizationDbContext : ApiAuthorizationDbContext<ApplicationUser>, IConfigurationDbContext
{


    public AppApiAuthorizationDbContext(
        DbContextOptions<AppApiAuthorizationDbContext> options,
        IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
    {
    }

    public DbSet<Duende.IdentityServer.EntityFramework.Entities.Client> Clients { get; set; } 
    public DbSet<Duende.IdentityServer.EntityFramework.Entities.ClientCorsOrigin> ClientCorsOrigins { get; set; } 
    public DbSet<Duende.IdentityServer.EntityFramework.Entities.IdentityResource> IdentityResources { get; set; } 
    public DbSet<Duende.IdentityServer.EntityFramework.Entities.ApiResource> ApiResources { get; set; } 
    public DbSet<Duende.IdentityServer.EntityFramework.Entities.ApiScope> ApiScopes { get; set; } 
    public DbSet<Duende.IdentityServer.EntityFramework.Entities.IdentityProvider> IdentityProviders { get; set; } 

}
