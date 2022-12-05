using Microsoft.EntityFrameworkCore;
using new_usaha.Domain.Entities;

namespace new_usaha.Application.Common.Interfaces
{
    public interface IApplicationDbContext
    {

        public DbSet<AddStockHistory> AddStockHistories { get; }
        public DbSet<EmployeePresence> EmployeePresences { get; }
        public DbSet<EmployeeJoin> EmployeeJoins { get; }
        public DbSet<EmployeePresenceCode> EmployeePresenceCodes { get; }
        public DbSet<EmployeeSchedule> EmployeeSchedules { get; }
        public DbSet<EmployeeScheduleType> EmployeeScheduleTypes { get; }
        public DbSet<Enterprise> Enterprises { get; }
        public IQueryable<Enterprise> Enterprises_ { get; }
        public DbSet<EnterpriseAddress> EnterpriseAddresses { get; }
        public DbSet<EnterpriseEmployee> EnterpriseEmployees { get; }
        public DbSet<EnterpriseRole> EnterpriseRoles { get; }
        public DbSet<EnterpriseClaim> EnterpriseClaims { get; }
        public DbSet<EnterpriseEmployeeRole> EnterpriseEmployeeRoles { get; }
        public DbSet<EnterpriseRoleClaim> EnterpriseRoleClaims { get; }

        public Task BeginTransactionAsync();
        public Task CommitTransactionAsync();
        public void RollbackTransaction();
        public DbSet<EnterpriseShift> EnterpriseShifts { get; }
        public DbSet<EnterpriseType> EnterpriseTypes { get; }
        public IQueryable<EnterpriseType> EnterpriseTypes_ { get; }
        public DbSet<Goods> Goodses { get; }
        public DbSet<GoodsPhoto> GoodsPhotos { get; }
        public DbSet<GoodsOrdered> GoodsOrdereds { get; }
        public DbSet<GoodsPrice> GoodsPrices { get; }
        public DbSet<GoodsWholesalePrice> GoodsWholesalePrices { get; }
        public DbSet<GoodsStock> GoodsStocks { get; }
        public DbSet<GoodsType> GoodsTypes { get; }
        public DbSet<Order> Orders { get; }
        public DbSet<OrderProgress> OrderProgresses { get; }
        public DbSet<OrderStatus> OrderStatuses { get; }
        public DbSet<PaymentMethod> PaymentMethods { get; }
        public DbSet<GoodsGroup> GoodsGroups { get; }
        public DbSet<GoodsGroupMember> GoodsGroupMembers { get; }

        public DbSet<GoodsAdjustment> GoodsAdjustments { get; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}