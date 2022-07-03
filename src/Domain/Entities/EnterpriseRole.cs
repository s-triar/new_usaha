using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using new_usaha.Domain.Common;

namespace new_usaha.Domain.Entities;

public class EnterpriseRole : AuditableEntity
{
    public EnterpriseRole()
    {
        this.EnterpriseRoleClaims = new HashSet<EnterpriseRoleClaim>();
        this.EnterpriseEmployeeRoles = new HashSet<EnterpriseEmployeeRole>();
        this.EnterpriseEmployees = new HashSet<EnterpriseEmployee>();
        this.EmployeeJoins = new HashSet<EmployeeJoin>();
    }
    public Guid Id { get; set; }
    public Guid EnterpriseId { get; set; }
    public virtual Enterprise Enterprise { get; set; } 
    public string Name { get; set; }
    public virtual ICollection<EmployeeJoin> EmployeeJoins { get; set; }
    public virtual ICollection<EnterpriseRoleClaim> EnterpriseRoleClaims { get; set; }
    public virtual ICollection<EnterpriseEmployeeRole> EnterpriseEmployeeRoles { get; set; }
    public virtual ICollection<EnterpriseEmployee> EnterpriseEmployees { get; set; }

}
