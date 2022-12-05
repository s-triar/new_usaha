using System.Reflection;
using new_usaha.Application.Common.Interfaces;
using new_usaha.Domain.Common;
using new_usaha.Domain.Entities;
using new_usaha.Infrastructure.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore.Query;
using Microsoft.EntityFrameworkCore.Storage;
using System.Data;
using MediatR;
using new_usaha.Infrastructure.Persistence.Interceptors;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace new_usaha.Infrastructure.Persistence;

public class AppIdentityDbContext : IdentityDbContext<ApplicationUser>
{
    //private readonly IMediator _mediator;
    //private readonly AuditableEntitySaveChangesInterceptor _auditableEntitySaveChangesInterceptor;

    public AppIdentityDbContext(
        DbContextOptions<AppIdentityDbContext> options
      
        //IMediator mediator
        //AuditableEntitySaveChangesInterceptor auditableEntitySaveChangesInterceptor
        ) : base(options)
    {
        //_mediator = mediator;
        //_auditableEntitySaveChangesInterceptor = auditableEntitySaveChangesInterceptor;
    }
    protected override void OnModelCreating(ModelBuilder builder)
    {
        //builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        base.OnModelCreating(builder);
    }


    //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    //{
    //    optionsBuilder.AddInterceptors(_auditableEntitySaveChangesInterceptor);
    //}

}
