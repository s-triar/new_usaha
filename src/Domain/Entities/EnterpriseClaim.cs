using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using new_usaha.Domain.Common;

namespace new_usaha.Domain.Entities;

public class EnterpriseClaim : AuditableEntity
{
    public EnterpriseClaim()
    {
        this.EnterpriseRoleClaims = new HashSet<EnterpriseRoleClaim>();
    }
    public Guid Id { get; set; }
    public int EnterpriseTypeId { get; set; }
    public virtual EnterpriseType EnterpriseType { get; set; } 
    public string Context { get; set; }  // e.g Dashboard, Workspace
    public string Feature { get; set; }  // e.g Pegawai, Kasir
    public string Action { get; set; }  // e.g Ubah, Buat
    public string Description { get; set; }  // e.g Hak untuk menhapus role
    public virtual ICollection<EnterpriseRoleClaim> EnterpriseRoleClaims { get; set; }
}
