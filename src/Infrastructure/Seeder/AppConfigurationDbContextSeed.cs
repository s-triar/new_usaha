using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Duende.IdentityServer;
using Duende.IdentityServer.EntityFramework.Entities;
using Duende.IdentityServer.EntityFramework.Mappers;
using Duende.IdentityServer.Models;
using new_usaha.Infrastructure.Persistence;
using ApiResource = Duende.IdentityServer.Models.ApiResource;
using ApiScope = Duende.IdentityServer.Models.ApiScope;
using Client = Duende.IdentityServer.Models.Client;
using Secret = Duende.IdentityServer.Models.Secret;

namespace new_usaha.Infrastructure.Seeder;

public static class AppConfigurationDbContextSeed
{
    public static async Task SeedIdentityResource(AppApiAuthorizationDbContext context)
    {
        if (!context.IdentityResources.Any())
        {
            await context.IdentityResources.AddAsync((new IdentityResources.OpenId()).ToEntity());
            await context.IdentityResources.AddAsync((new IdentityResources.Profile()).ToEntity());
            await context.IdentityResources.AddAsync((new IdentityResources.Email()).ToEntity());
            await context.IdentityResources.AddAsync((new IdentityResources.Phone()).ToEntity());
            await context.SaveChangesAsync();
        }
    }
    public static async Task SeedApiResoureces(AppApiAuthorizationDbContext context)
    {
        if (!context.ApiResources.Any())
        {
            await context.ApiResources.AddAsync((new ApiResource("usahaku_app.api", "Usahaku App Client")).ToEntity());
            await context.SaveChangesAsync();

            await context.ApiResources.AddAsync((new ApiResource("usahaku_app_live.api", "Usahaku App Client Live")).ToEntity());
            await context.SaveChangesAsync();
        }

    }
    public static async Task SeedApiScope(AppApiAuthorizationDbContext context)
    {
        if (!context.ApiScopes.Any())
        {
            var ar = context.ApiResources.FirstOrDefault(m => m.Name == "usahaku_app.api")!;
            var t = new ApiScope
            {
                Name = ar.Name,
                ShowInDiscoveryDocument = true
            };
            await context.ApiScopes.AddAsync(t.ToEntity());
            await context.SaveChangesAsync();

            var ar2 = context.ApiResources.FirstOrDefault(m => m.Name == "usahaku_app_live.api")!;
            var t2 = new ApiScope
            {
                Name = ar2.Name,
                ShowInDiscoveryDocument = true
            };
            await context.ApiScopes.AddAsync(t2.ToEntity());
            await context.SaveChangesAsync();
        }

    }
    public static async Task SeedApiResouceScope(AppApiAuthorizationDbContext context)
    {
        if (!context.ApiResources.Any())
        {
            var ar = context.ApiResources.FirstOrDefault(m => m.Name == "usahaku_app.api")!;
            ar.Scopes.Add(new ApiResourceScope
            {
                Scope = ar.Name
            });
            context.ApiResources.Update(ar);
            await context.SaveChangesAsync();

            var ar2 = context.ApiResources.FirstOrDefault(m => m.Name == "usahaku_app_live.api")!;
            ar2.Scopes.Add(new ApiResourceScope
            {
                Scope = ar2.Name
            });
            context.ApiResources.Update(ar2);
            await context.SaveChangesAsync();
        }

    }
    public static async Task SeedClient(AppApiAuthorizationDbContext context)
    {
        var check = context.Clients.FirstOrDefault(m => m.ClientId == "usahaku_app");
        if (check == null)
        {
            var jsClient = new Client
            {
                ClientId = "usahaku_app",
                ClientName = "Usahaku App Client + Api",
                ClientUri = "https://localhost:44313",
                ClientSecrets = { new Secret("wooooohooo:)".Sha256()) },
                //ClientSecrets = { new ClientSecret { Type = IdentityServerConstants.SecretTypes.SharedSecret, Value = "secret".ToSha256() } },
                AllowedGrantTypes = GrantTypes.Code,
                //AllowedGrantTypes = { new ClientGrantType { GrantType = GrantTypes.Implicit } },
                AllowAccessTokensViaBrowser = true,
                RequirePkce = true,
                RequireClientSecret = false,
                RedirectUris = { "https://localhost:44313", "https://localhost:44313/silent-refresh.html" },
                PostLogoutRedirectUris = { "https://localhost:44313" },
                AllowedCorsOrigins = { "https://localhost:44313" },
                AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        IdentityServerConstants.StandardScopes.Email,
                        IdentityServerConstants.StandardScopes.Phone,
                        IdentityServerConstants.StandardScopes.OfflineAccess,
                        "usahaku_app.api"
                    },
                AllowOfflineAccess = true,
                LogoUri = "https://angular.io/assets/images/logos/angular/angular_solidBlack.svg",
                UpdateAccessTokenClaimsOnRefresh = true,
                RequireConsent = false,

                //RedirectUris = { new ClientRedirectUri { RedirectUri = "https://localhost:44312/authentication/login-callback" } },
                //PostLogoutRedirectUris = { new ClientPostLogoutRedirectUri { PostLogoutRedirectUri = "https://localhost:44312/authentication/logout-callback" } },
                //AllowedCorsOrigins = { new ClientCorsOrigin { Origin = "https://localhost:43312" } },

                //AllowedScopes =
                //{
                //   new ClientScope {Scope =  IdentityServerConstants.StandardScopes.OpenId },
                //   new ClientScope {Scope =  IdentityServerConstants.StandardScopes.Profile },
                //   new ClientScope {Scope =  IdentityServerConstants.StandardScopes.Email },
                //   new ClientScope {Scope =  "api1" }
                //}
            };
            var temp = jsClient.ToEntity();
            await context.Clients.AddAsync(temp);
            await context.SaveChangesAsync();
        }

        check = context.Clients.FirstOrDefault(m => m.ClientId == "usahaku_app_live");
        if (check == null)
        {
            var jsClient = new Client
            {
                ClientId = "usahaku_app_live",
                ClientName = "Usahaku App Client + Api Live",
                ClientUri = "https://localhost:4423",
                ClientSecrets = { new Secret("wooooohooo:D".Sha256()) },
                //ClientSecrets = { new ClientSecret { Type = IdentityServerConstants.SecretTypes.SharedSecret, Value = "secret".ToSha256() } },
                AllowedGrantTypes = GrantTypes.Code,
                //AllowedGrantTypes = { new ClientGrantType { GrantType = GrantTypes.Implicit } },
                AllowAccessTokensViaBrowser = true,
                RequirePkce = true,
                RequireClientSecret = false,
                RedirectUris = { "https://localhost:4423" },
                PostLogoutRedirectUris = { "https://localhost:4423", "https://localhost:4423/silent-refresh.html" },
                AllowedCorsOrigins = { "https://localhost:4423" },
                AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        IdentityServerConstants.StandardScopes.Email,
                        IdentityServerConstants.StandardScopes.Phone,
                        IdentityServerConstants.StandardScopes.OfflineAccess,
                        "usahaku_app_live.api"
                    },
                AllowOfflineAccess = true,
                LogoUri = "https://angular.io/assets/images/logos/angular/angular_solidBlack.svg",
                UpdateAccessTokenClaimsOnRefresh = true,
                RequireConsent = false,

                //RedirectUris = { new ClientRedirectUri { RedirectUri = "https://localhost:44312/authentication/login-callback" } },
                //PostLogoutRedirectUris = { new ClientPostLogoutRedirectUri { PostLogoutRedirectUri = "https://localhost:44312/authentication/logout-callback" } },
                //AllowedCorsOrigins = { new ClientCorsOrigin { Origin = "https://localhost:43312" } },

                //AllowedScopes =
                //{
                //   new ClientScope {Scope =  IdentityServerConstants.StandardScopes.OpenId },
                //   new ClientScope {Scope =  IdentityServerConstants.StandardScopes.Profile },
                //   new ClientScope {Scope =  IdentityServerConstants.StandardScopes.Email },
                //   new ClientScope {Scope =  "api1" }
                //}
            };
            var temp = jsClient.ToEntity();
            await context.Clients.AddAsync(temp);
            await context.SaveChangesAsync();
        }

    }
}

