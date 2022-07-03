using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using new_usaha.Domain.Common;

namespace new_usaha.Domain.Entities;

public class EmployeePresence : AuditableEntity
{

    public Guid Id { get; set; }
    public Guid EnterpriseEmployeeId { get; set; }
    public virtual EnterpriseEmployee EnterpriseEmployee { get; set; } 
    public string Status { get; set; } 
    public Guid EmployeePresenceCode_Start_Id { get; set; }
    public virtual EmployeePresenceCode EmployeePresenceCode_Start { get; set; } 
    public Guid EmployeePresenceCode_End_Id { get; set; }
    public virtual EmployeePresenceCode EmployeePresenceCode_End { get; set; } 
    public string? Description { get; set; }
    public bool Approval { get; set; }
    public DateTime? ApprovalDate { get; set; }
    public string? UserApproverId { get; set; }
    public long NumberHours { get; set; }
}
