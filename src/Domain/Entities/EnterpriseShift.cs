using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using new_usaha.Domain.Common;

namespace new_usaha.Domain.Entities;

// Hold employee's shift data
public class EnterpriseShift : AuditableEntity
{
    public Guid Id { get; set; }
    public Guid EnterpriseId { get; set; }
    public virtual Enterprise Enterprise { get; set; } 
    public DateTime Start { get; set; }
    public DateTime End { get; set; }
    public long Number { get; set; }
}
