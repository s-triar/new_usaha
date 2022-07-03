using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using new_usaha.Domain.Common;

namespace new_usaha.Domain.Entities;

public class EnterpriseEmployee : AuditableEntity
{
    // Hold list of employee of particular Enterprise
    public EnterpriseEmployee()
    {
        this.EmployeePresences = new HashSet<EmployeePresence>();
        this.EmployeeSchedules = new HashSet<EmployeeSchedule>();

    }

    public Guid Id { get; set; }
    public Guid EnterpriseId { get; set; }
    public virtual Enterprise Enterprise { get; set; }
    public Guid EnterpriseRoleId { get; set; }
    public virtual EnterpriseRole EnterpriseRole { get; set; }
    public string UserId { get; set; }
    public string UserName { get; set; }
    public string Status { get; set; } 
    public virtual ICollection<EmployeePresence> EmployeePresences { get; set; }
    public virtual ICollection<EmployeeSchedule> EmployeeSchedules { get; set; }



}
