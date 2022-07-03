using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using new_usaha.Domain.Common;

namespace new_usaha.Domain.Entities;

public class EnterpriseRoleClaim : AuditableEntity
{
    public Guid Id { get; set; }
    public Guid EnterpriseRoleId { get; set; }
    public virtual EnterpriseRole EnterpriseRole { get; set; } 
    public Guid EnterpriseClaimId { get; set; }
    public virtual EnterpriseClaim EnterpriseClaim { get; set; } 
}
