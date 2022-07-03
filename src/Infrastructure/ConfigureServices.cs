using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
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
        private static readonly string connectionStringAuth = "MySqlConnectionAuth";
        public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<AuditableEntitySaveChangesInterceptor>();

            services.AddCors(options =>
            {
                options.AddDefaultPolicy(
                    builder =>
                    {
                        var temp = configuration.GetSection("DefaultCors").Value;
                        var temp_split = temp.Split(",");
                        builder.WithOrigins(temp_split).AllowAnyHeader().AllowAnyMethod();
                    });
            });
            

            services.AddDbContext<ApplicationDbContext>(options =>
                   options.UseMySql(configuration.GetConnectionString(connectionStringApp), new MySqlServerVersion(new Version(10, 1, 40))));
            services.AddDbContext<AppApiAuthorizationDbContext>(options =>
                    options.UseMySql(configuration.GetConnectionString(connectionStringAuth), new MySqlServerVersion(new Version(10, 1, 40))));

            services.AddScoped<IApplicationDbContext>(provider => provider.GetRequiredService<ApplicationDbContext>());
            services.AddScoped<AppApiAuthorizationDbContext>();
            services.AddScoped<ApplicationDbContextInitialiser>();
            services.AddScoped<AppApiAuthorizationDbContextInitialiser>();
            services.AddScoped<IDomainEventService, DomainEventService>();
            services.AddDefaultIdentity<ApplicationUser>(
                options =>
                {
                    options.Password.RequireDigit = false;
                    options.Password.RequiredLength = 3;
                    options.Password.RequireLowercase = false;
                    options.Password.RequireNonAlphanumeric = false;
                    options.Password.RequireUppercase = false;
                    options.Password.RequiredUniqueChars = 0;

                    //Disable account confirmation.
                    options.SignIn.RequireConfirmedAccount = false;
                    options.SignIn.RequireConfirmedEmail = false;
                    options.SignIn.RequireConfirmedPhoneNumber = false;
                })
                .AddEntityFrameworkStores<AppApiAuthorizationDbContext>();

            services.AddIdentityServer()
                .AddJwtBearerClientAuthentication()
                .AddApiAuthorization<ApplicationUser, AppApiAuthorizationDbContext>()
                .AddConfigurationStore<AppApiAuthorizationDbContext>()
                .AddOperationalStore<AppApiAuthorizationDbContext>();

            services.AddTransient<IDateTime, DateTimeService>();
            services.AddTransient<IIdentityService, IdentityService>();
            services.AddTransient<ICsvFileBuilder, CsvFileBuilder>();

            services.AddAuthentication()
                .AddIdentityServerJwt();

            var handler = new HttpClientHandler();
            handler.CheckCertificateRevocationList = false;
            handler.ServerCertificateCustomValidationCallback +=
                            (sender, certificate, chain, errors) =>
                            {
                                return true;
                            };

            services.Configure<JwtBearerOptions>(
                IdentityServerJwtConstants.IdentityServerJwtBearerScheme,
                options =>
                {
                    options.SaveToken = true;
                    options.Audience = configuration.GetSection("ClientInfo").GetValue<string>("Audience");
                    options.Authority = configuration.GetSection("ClientInfo").GetValue<string>("Authority");
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateAudience = false,

                    };

                    options.BackchannelHttpHandler = handler; //bypass certificate
                });
            
            services.AddAuthorization(options =>
                options.AddPolicy("CanPurge", policy => policy.RequireRole("Administrator")));

            //services.AddTransient<IEmailSender, EmailSenderService>();
            services.Configure<EmailSenderOption>(options =>
            {
                options.Host_Address = configuration["ExternalProviders:MailKit:SMTP:Address"];
                options.Host_Port = Convert.ToInt32(configuration["ExternalProviders:MailKit:SMTP:Port"]);
                options.Host_Username = configuration["ExternalProviders:MailKit:SMTP:Account"];
                options.Host_Password = configuration["ExternalProviders:MailKit:SMTP:Password"];
                options.Sender_EMail = configuration["ExternalProviders:MailKit:SMTP:SenderEmail"];
                options.Sender_Name = configuration["ExternalProviders:MailKit:SMTP:SenderName"];
            });
            //services.AddTransient<ISendEmailTemplateService, SendEmailTemplateService>();
            return services;
        }
    }
}