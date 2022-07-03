using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using new_usaha.Domain.Common;

namespace new_usaha.Domain.Entities
{
    public class EmployeeSchedule: AuditableEntity
    {
        
        public Guid Id { get; set; }
        public UInt64 EnterpriseEmployeeId { get; set; }
        public virtual EnterpriseEmployee EnterpriseEmployee { get; set; }
        public string Schedule { get; set; }
        public int EmployeeScheduleTypeId { get; set; }
        public virtual EmployeeScheduleType EmployeeScheduleType { get; set; }
    }
}
