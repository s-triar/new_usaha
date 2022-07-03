using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using new_usaha.Domain.Common;

namespace new_usaha.Domain.Entities;

public class EmployeePresenceCode : AuditableEntity
{

    public Guid Id { get; set; }
    public string Code { get; set; } 
    public string UserName { get; set; } 
    public Guid UserId { get; set; }
    public Guid EnterpriseId { get; set; }
    public virtual Enterprise Enterprise { get; set; } 
    public bool IsValid { get; set; }
    public long Tries { get; set; }

}
