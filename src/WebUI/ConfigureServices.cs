﻿using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Mvc;
using new_usaha.Application.Common.Interfaces;
using new_usaha.Infrastructure.Persistence;
using new_usaha.WebUI.Filters;
using new_usaha.WebUI.Services;
using NSwag;
using NSwag.Generation.Processors.Security;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class ConfigureServices
    {
        public static IServiceCollection AddWebUIServices(this IServiceCollection services)
        {
            services.AddDatabaseDeveloperPageExceptionFilter();

            services.AddSingleton<ICurrentUserService, CurrentUserService>();
            services.AddSingleton<ICurrentUserService, CurrentUserService>();
            services.AddScoped<ICurrentUserService, CurrentUserService>();
            services.AddScoped<ICurrentEnterpriseService, CurrentEnterpriseService>();
            services.AddHttpContextAccessor();

            services.AddDatabaseDeveloperPageExceptionFilter();

            services.AddHealthChecks()
                .AddDbContextCheck<ApplicationDbContext>("App Db")
                .AddDbContextCheck<AppApiAuthorizationDbContext>("Auth Db"); ;

            services.AddControllersWithViews(options =>
                options.Filters.Add<ApiExceptionFilterAttribute>())
                    .AddFluentValidation(x => x.AutomaticValidationEnabled = false);

            services.AddRazorPages();

            // Customise default API behaviour
            services.Configure<ApiBehaviorOptions>(options =>
                options.SuppressModelStateInvalidFilter = true);

            services.AddOpenApiDocument(configure =>
            {
                configure.Title = "new_usaha API";
                configure.AddSecurity("JWT", Enumerable.Empty<string>(), new OpenApiSecurityScheme
                {
                    Type = OpenApiSecuritySchemeType.ApiKey,
                    Name = "Authorization",
                    In = OpenApiSecurityApiKeyLocation.Header,
                    Description = "Type into the textbox: Bearer {your JWT token}."
                });

                configure.OperationProcessors.Add(new AspNetCoreOperationSecurityScopeProcessor("JWT"));
            });

            return services;
        }
    }
}