using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using new_usaha.Domain.Common;

namespace new_usaha.Domain.Entities;

public class Enterprise : AuditableEntity
{
    public Enterprise()
    {
        this.EnterpriseAddresses = new HashSet<EnterpriseAddress>();
        this.EnterpriseEmployees = new HashSet<EnterpriseEmployee>();
        this.EmployeePresenceCodes = new HashSet<EmployeePresenceCode>();
        this.EnterpriseShifts = new HashSet<EnterpriseShift>();
        this.Goodses = new HashSet<Goods>();
        this.Orders = new HashSet<Order>();
    }

    public Guid Id { get; set; }
    public string Name { get; set; } 
    public string Code { get; set; } 
    public string? Description { get; set; }
    public int EnterpriseTypeId { get; set; }
    public virtual EnterpriseType EnterpriseType { get; set; } 
    public string UserOwnerId { get; set; } 
    public string? Photo { get; set; }
    public string Phone { get; set; } 
    public string Email { get; set; } 
    public virtual ICollection<EnterpriseAddress> EnterpriseAddresses { get; set; }
    public virtual ICollection<EnterpriseEmployee> EnterpriseEmployees { get; set; }
    public virtual ICollection<EmployeePresenceCode> EmployeePresenceCodes { get; set; }
    public virtual ICollection<EnterpriseShift> EnterpriseShifts { get; set; }
    public virtual ICollection<Goods> Goodses { get; set; }
    public virtual ICollection<Order> Orders { get; set; }
}
