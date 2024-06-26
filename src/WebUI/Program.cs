using new_usaha.Infrastructure.Persistence;

var builder = WebApplication.CreateBuilder(args);
AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

// Add services to the container.
builder.Services.AddApplicationServices();
builder.Services.AddInfrastructureServices(builder.Configuration);
builder.Services.AddWebUIServices();

builder.Services.AddEndpointsApiExplorer();



var app = builder.Build();



app.UseOpenApi();

app.UseSwaggerUi(settings =>
{

    settings.Path = "/api";
    settings.DocumentPath = "/api/specification.json";
    //settings.DocumentPath = "/swagger/v1/swagger.json";
});

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseMigrationsEndPoint();

    // Initialise and seed database
    using (var scope = app.Services.CreateScope())
    {
        var initialiser_auth = scope.ServiceProvider.GetRequiredService<AppApiAuthorizationDbContextInitialiser>();
        await initialiser_auth.InitialiseAsync();
        await initialiser_auth.SeedAsync();

        var initialiser = scope.ServiceProvider.GetRequiredService<ApplicationDbContextInitialiser>();
        await initialiser.InitialiseAsync();
        await initialiser.SeedAsync();

        
    }



}
else
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHealthChecks("/health");
app.UseHttpsRedirection();
app.UseStaticFiles();


app.UseRouting();
app.UseCors();

app.UseAuthentication();

app.UseAuthorization();
app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapRazorPages();

app.MapFallbackToFile("index.html"); ;

app.Run();

// Make the implicit Program class public so test projects can access it
public partial class Program { }