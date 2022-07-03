using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using new_usaha.Domain.Common;

namespace new_usaha.Domain.Entities;

public class EnterpriseType : AuditableEntity
{
    public EnterpriseType()
    {
        this.Enterprises = new HashSet<Enterprise>();
        this.EnterpriseClaims = new HashSet<EnterpriseClaim>();

    }
    public int Id { get; set; }
    public string Name { get; set; } 
    public string Provide { get; set; } 
    public virtual ICollection<Enterprise> Enterprises { get; set; }
    public virtual ICollection<EnterpriseClaim> EnterpriseClaims { get; set; }
}
