using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace new_usaha.Domain.Entities;

public class EmployeeJoin: AuditableEntity
{
    public Guid Id { get; set; }
    public Guid EnterpriseId { get; set; }
    public virtual Enterprise Enterprise { get; set; }
    public Guid EnterpriseRoleId { get; set; }
    public virtual EnterpriseRole EnterpriseRole { get; set; }
    public string UserId { get; set; } 
    public int Code { get; set; }
    public DateTime ExpiredTime { get; set; }
    public bool IsUsed { get; set; }
}
