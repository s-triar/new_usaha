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

public class ApplicationDbContext : DbContext, IApplicationDbContext
{
    private readonly ICurrentUserService _currentUserService;
    private readonly IDateTime _dateTime;
    private readonly IDomainEventService _domainEventService;
    private IDbContextTransaction? _currentTransaction;
    private readonly IMediator _mediator;
    private readonly AuditableEntitySaveChangesInterceptor _auditableEntitySaveChangesInterceptor;

    public ApplicationDbContext(
        DbContextOptions<ApplicationDbContext> options,
        ICurrentUserService currentUserService,
        IDomainEventService domainEventService,
        IMediator mediator,
        AuditableEntitySaveChangesInterceptor auditableEntitySaveChangesInterceptor,
        IDateTime dateTime) : base(options)
    {
        _currentUserService = currentUserService;
        _domainEventService = domainEventService;
        _dateTime = dateTime;
        _mediator = mediator;
        _auditableEntitySaveChangesInterceptor = auditableEntitySaveChangesInterceptor;
    }

    public DbSet<AddStockHistory> AddStockHistories => Set<AddStockHistory>();
    public DbSet<EmployeePresence> EmployeePresences => Set<EmployeePresence>();
    public DbSet<EmployeePresenceCode> EmployeePresenceCodes => Set<EmployeePresenceCode>();
    public DbSet<EmployeeJoin> EmployeeJoins => Set<EmployeeJoin>();
    public DbSet<EmployeeSchedule> EmployeeSchedules => Set<EmployeeSchedule>();
    public DbSet<EmployeeScheduleType> EmployeeScheduleTypes => Set<EmployeeScheduleType>();
    public DbSet<Enterprise> Enterprises => Set<Enterprise>();

    public IQueryable<Enterprise> Enterprises_
    {
        get
        {
            return this.Enterprises.Where(z => z.DeletedAt != null);
        }
    }

    public DbSet<EnterpriseAddress> EnterpriseAddresses => Set<EnterpriseAddress>();
    public DbSet<EnterpriseEmployee> EnterpriseEmployees => Set<EnterpriseEmployee>();
    public DbSet<EnterpriseRole> EnterpriseRoles => Set<EnterpriseRole>();
    public DbSet<EnterpriseClaim> EnterpriseClaims => Set<EnterpriseClaim>();
    public DbSet<EnterpriseEmployeeRole> EnterpriseEmployeeRoles => Set<EnterpriseEmployeeRole>();
    public DbSet<EnterpriseRoleClaim> EnterpriseRoleClaims => Set<EnterpriseRoleClaim>();
    public DbSet<EnterpriseShift> EnterpriseShifts => Set<EnterpriseShift>();
    public DbSet<EnterpriseType> EnterpriseTypes => Set<EnterpriseType>();

    public IQueryable<EnterpriseType> EnterpriseTypes_
    {
        get
        {
            return this.EnterpriseTypes.Where(z => z.DeletedAt != null);
        }
    }

    public DbSet<GoodsGroup> GoodsGroups => Set<GoodsGroup>();
    public DbSet<GoodsGroupMember> GoodsGroupMembers => Set<GoodsGroupMember>();
    public DbSet<Goods> Goodses => Set<Goods>();
    public DbSet<GoodsPhoto> GoodsPhotos => Set<GoodsPhoto>();
    public DbSet<GoodsOrdered> GoodsOrdereds => Set<GoodsOrdered>();
    public DbSet<GoodsPrice> GoodsPrices => Set<GoodsPrice>();
    public DbSet<GoodsStock> GoodsStocks => Set<GoodsStock>();
    public DbSet<GoodsType> GoodsTypes => Set<GoodsType>();
    public DbSet<Order> Orders => Set<Order>();
    public DbSet<OrderProgress> OrderProgresses => Set<OrderProgress>();
    public DbSet<OrderStatus> OrderStatuses => Set<OrderStatus>();
    public DbSet<PaymentMethod> PaymentMethods => Set<PaymentMethod>();
    public DbSet<GoodsAdjustment> GoodsAdjustments => Set<GoodsAdjustment>();

    public async Task BeginTransactionAsync()
    {
        if (_currentTransaction != null)
        {
            return;
        }

        _currentTransaction = await base.Database.BeginTransactionAsync(IsolationLevel.ReadCommitted).ConfigureAwait(false);
    }

    public async Task CommitTransactionAsync()
    {
        try
        {
            await SaveChangesAsync().ConfigureAwait(false);

            _currentTransaction?.Commit();
        }
        catch
        {
            RollbackTransaction();
            throw;
        }
        finally
        {
            if (_currentTransaction != null)
            {
                _currentTransaction.Dispose();
                _currentTransaction = null;
            }
        }
    }

    public void RollbackTransaction()
    {
        try
        {
            _currentTransaction?.Rollback();
        }
        finally
        {
            if (_currentTransaction != null)
            {
                _currentTransaction.Dispose();
                _currentTransaction = null;
            }
        }
    }

    //public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
    //{
    //    foreach (var entry in ChangeTracker.Entries<AuditableEntity>())
    //    {
    //        switch (entry.State)
    //        {
    //            case EntityState.Added:
    //                entry.Entity.CreatedBy = _currentUserService.UserId;
    //                entry.Entity.CreatedAt = _dateTime.Now;
    //                break;

    //            case EntityState.Modified:
    //                entry.Entity.LastModifiedBy = _currentUserService.UserId;
    //                entry.Entity.LastModifiedAt = _dateTime.Now;
    //                break;
    //            case EntityState.Deleted:
    //                entry.State = EntityState.Modified;
    //                entry.Entity.DeletedBy = _currentUserService.UserId;
    //                entry.Entity.DeletedAt = _dateTime.Now;
    //                break;
    //        }
    //    }

    //    var events = ChangeTracker.Entries<IHasDomainEvent>()
    //            .Select(x => x.Entity.DomainEvents)
    //            .SelectMany(x => x)
    //            .Where(domainEvent => !domainEvent.IsPublished)
    //            .ToArray();

    //    var result = await base.SaveChangesAsync(cancellationToken);

    //    await DispatchEvents(events);

    //    return result;
    //}

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        var fixDecimalDatas = new List<Tuple<Type, Type, string>>();
        var fixTextDatas = new List<Tuple<Type, Type, string>>();
        foreach (var entityType in builder.Model.GetEntityTypes())
        {
            foreach (var property in entityType.GetProperties())
            {
                if (Type.GetTypeCode(property.ClrType) == TypeCode.Decimal)
                {
                    fixDecimalDatas.Add(new Tuple<Type, Type, string>(entityType.ClrType, property.ClrType, property.Name));
                }
                if (property.Name == "Description")
                {
                    //fixTextDatas.Add(new Tuple<Type, Type, string>(entityType.ClrType, property.ClrType, property.Name));
                    builder.Entity(entityType.ClrType).Property(property.ClrType, property.Name).HasColumnType("text");

                }
                else if (Type.GetTypeCode(property.ClrType) == TypeCode.String)
                {
                    builder.Entity(entityType.ClrType).Property(property.ClrType, property.Name).HasColumnType("varchar(255)");

                }
            }
        }
        foreach (var item in fixDecimalDatas)
        {
            builder.Entity(item.Item1).Property(item.Item2, item.Item3).HasColumnType("decimal(18,4)");
        }
        var entities = builder.Model
            .GetEntityTypes()
            .Where(e => e.GetProperties().Any(x => x.Name == "DeletedAt"))
            .Select(e => e.ClrType);
        foreach (var entity in entities)
        {
            Expression<Func<AuditableEntity, bool>> expression = p => p.DeletedAt == null;
            var newParam = Expression.Parameter(entity);
            var newbody = ReplacingExpressionVisitor.Replace(expression.Parameters.Single(), newParam, expression.Body);
            builder.Entity(entity).HasQueryFilter(Expression.Lambda(newbody, newParam));
        }
        builder.Entity<Enterprise>()
                    .HasIndex(p => p.Code)
                    .IsUnique();
        base.OnModelCreating(builder);
    }

    //private async Task DispatchEvents(DomainEvent[] events)
    //{
    //    foreach (var @event in events)
    //    {
    //        @event.IsPublished = true;
    //        await _domainEventService.Publish(@event);
    //    }
    //}
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.AddInterceptors(_auditableEntitySaveChangesInterceptor);
    }

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        await _mediator.DispatchDomainEvents(this);

        return await base.SaveChangesAsync(cancellationToken);
    }
}
