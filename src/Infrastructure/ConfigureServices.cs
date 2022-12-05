//using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
//using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using new_usaha.Application.Common.Interfaces;
using new_usaha.Infrastructure.Email;
using new_usaha.Infrastructure.Files;
using new_usaha.Infrastructure.Identity;
using new_usaha.Infrastructure.Persistence;
using new_usaha.Infrastructure.Persistence.Interceptors;
using new_usaha.Infrastructure.Services;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class ConfigureServices
    {
        private static readonly string connectionStringApp = "MySqlConnectionApp";
        private static readonly string connectionStringIdentity = "MySqlConnectionIdentity";
        public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<AuditableEntitySaveChangesInterceptor>();

            services.AddCors(options =>
            {
                options.AddDefaultPolicy(
                    builder =>
                    {
                        //var temp = configuration.GetSection("DefaultCors").Value;
                        //var temp_split = temp.Split(",");
                        builder.WithOrigins("*").AllowAnyHeader().AllowAnyMethod();
                    });
            });
            services.AddDefaultIdentity<ApplicationUser>(c =>
            {
                c.Password.RequireDigit = false;
                c.Password.RequiredLength = 3;
                c.Password.RequiredUniqueChars = 0;
                c.Password.RequireLowercase = false;
                c.Password.RequireUppercase = false;
                c.Password.RequireNonAlphanumeric = false;
                c.User.RequireUniqueEmail = true;
                c.SignIn.RequireConfirmedEmail = false;

            })
           .AddEntityFrameworkStores<AppIdentityDbContext>()
           .AddDefaultTokenProviders();

            services.AddDbContext<AppIdentityDbContext>(options =>
                   options.UseMySql(configuration.GetConnectionString(connectionStringIdentity), new MySqlServerVersion(new Version(10, 1, 40))));
            services.AddDbContext<ApplicationDbContext>(options =>
                   options.UseMySql(configuration.GetConnectionString(connectionStringApp), new MySqlServerVersion(new Version(10, 1, 40))));

            services.AddScoped<IApplicationDbContext>(provider => provider.GetRequiredService<ApplicationDbContext>());
            //services.AddScoped<AppIdentityDbContext>(provider => provider.GetRequiredService<AppIdentityDbContext>());
            services.AddScoped<ApplicationDbContextInitialiser>();
            services.AddScoped<AppApiAuthorizationDbContextInitialiser>();
            services.AddScoped<IDomainEventService, DomainEventService>();
           

            //services.AddIdentityServer(
            ////    opt =>
            ////{
            ////    opt.Authentication.CookieLifetime   = TimeSpan.FromDays(1);
            ////    opt.Authentication.CookieSlidingExpiration = true;
            ////    opt.PersistentGrants.DataProtectData = true;
            ////    opt.Authentication.CookieSameSiteMode = AspNetCore.Http.SameSiteMode.None;
            ////}
            //)
            //    .AddJwtBearerClientAuthentication()
            //    .AddApiAuthorization<ApplicationUser, AppApiAuthorizationDbContext>()
            //    .AddConfigurationStore<AppApiAuthorizationDbContext>()
            //    .AddOperationalStore<AppApiAuthorizationDbContext>();

            services.AddTransient<IDateTime, DateTimeService>();
            services.AddTransient<IIdentityService, IdentityService>();
            services.AddTransient<ICsvFileBuilder, CsvFileBuilder>();

           

            services.AddAuthentication()
                .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, c =>
                {
                    var secret = configuration["JwtSettings:SymKey"];
                    var secretByte = Encoding.UTF8.GetBytes(secret);
                    var key = new SymmetricSecurityKey(secretByte);

                    c.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = key
                    };
                })
                ;
            services.AddAuthorization(options =>
            {
                options.DefaultPolicy = new AuthorizationPolicyBuilder()
                        .RequireAuthenticatedUser()
                        .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme
                        //, yang lain
                        ).Build();
                options.AddPolicy("CanPurge", policy => policy.RequireRole("Administrator"));
                //.Build());
            });

            services.AddTransient<IEmailSender, EmailSenderService>();
            services.Configure<EmailSenderOption>(options =>
            {
                options.Host_Address = configuration["ExternalProviders:MailKit:SMTP:Address"];
                options.Host_Port = Convert.ToInt32(configuration["ExternalProviders:MailKit:SMTP:Port"]);
                options.Host_Username = configuration["ExternalProviders:MailKit:SMTP:Account"];
                options.Host_Password = configuration["ExternalProviders:MailKit:SMTP:Password"];
                options.Sender_EMail = configuration["ExternalProviders:MailKit:SMTP:SenderEmail"];
                options.Sender_Name = configuration["ExternalProviders:MailKit:SMTP:SenderName"];
            });
            services.AddTransient<ISendEmailTemplateService, SendEmailTemplateService>();


            // DEUENDE
            //var handler = new HttpClientHandler();
            ////handler.CheckCertificateRevocationList = false;
            //handler.ServerCertificateCustomValidationCallback +=
            //                (sender, certificate, chain, errors) =>
            //                {
            //                    return true;
            //                };
            //services.AddAuthentication()
            //    .AddJwtBearer("default-jwt", options =>
            //    {

            //        var secretBytes = Encoding.UTF8.GetBytes(configuration.GetSection("DefaultJWT").GetValue<string>("Secret"));
            //        var key = new SymmetricSecurityKey(secretBytes);
            //        options.SaveToken = true;
            //        //options.Audience = configuration.GetSection("ClientInfo").GetValue<string>("Audience");
            //        //options.Authority = configuration.GetSection("ClientInfo").GetValue<string>("Authority");
            //        options.Events = new JwtBearerEvents()
            //        {
            //            OnMessageReceived = context =>
            //            {
            //                if (context.Request.Query.ContainsKey("access_token"))
            //                {
            //                    context.Token = context.Request.Query["access_token"];
            //                }
            //                return Task.CompletedTask;
            //            }
            //        };
            //        options.TokenValidationParameters = new TokenValidationParameters
            //        {
            //            //ValidateAudience = false,
            //            IssuerSigningKey = key,
            //            ValidIssuer = configuration.GetSection("DefaultJWT").GetValue<string>("Issuer"),
            //            ValidAudience = configuration.GetSection("DefaultJWT").GetValue<string>("Audience"),
            //        };
            //        options.BackchannelHttpHandler = handler; //bypass certificate
            //    });
            //services.AddDefaultIdentity<IdentityUser>(
            //   options =>
            //   {
            //       options.Password.RequireDigit = false;
            //       options.Password.RequiredLength = 3;
            //       options.Password.RequireLowercase = false;
            //       options.Password.RequireNonAlphanumeric = false;
            //       options.Password.RequireUppercase = false;
            //       options.Password.RequiredUniqueChars = 0;

            //       //Disable account confirmation.
            //       options.SignIn.RequireConfirmedAccount = false;
            //       options.SignIn.RequireConfirmedEmail = false;
            //       options.SignIn.RequireConfirmedPhoneNumber = false;

            //   })
            //   //.AddRoles<ApplicationUserRole>()
            //   .AddEntityFrameworkStores<AppIdentityDbContext>()
            //   .AddDefaultUI()
            //   .AddDefaultTokenProviders();
            //services.Configure<JwtBearerOptions>(
            //    IdentityServerJwtConstants.IdentityServerJwtBearerScheme,
            //    options =>
            //    {
            //        options.SaveToken = true;
            //        options.Audience = configuration.GetSection("ClientInfo").GetValue<string>("Audience");
            //        options.Authority = configuration.GetSection("ClientInfo").GetValue<string>("Authority");
            //        options.TokenValidationParameters = new TokenValidationParameters
            //        {
            //            ValidateAudience = false,
            //        };
            //        options.BackchannelHttpHandler = handler; //bypass certificate
            //    });
            // END DUENDE



            return services;
        }
    }
}