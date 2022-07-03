using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using new_usaha.Domain.Common;

namespace new_usaha.Domain.Entities
{
    public class EmployeeScheduleType: AuditableEntity
    {
        public EmployeeScheduleType()
        {
            this.EmployeeSchedules = new HashSet<EmployeeSchedule>();
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual ICollection<EmployeeSchedule> EmployeeSchedules { get; set; }
    }
}
