using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace new_usaha.Domain.Entities;

public class GoodsGroup: AuditableEntity
{
    public GoodsGroup()
    {
        this.Members = new HashSet<GoodsGroupMember>();

    }
    public Guid Id { get; set; }
    public Guid EnterpriseId { get; set; }
    public virtual Enterprise Enterprise { get; set; } 
    public string Name { get; set; } 
    public string? Description { get; set; }
    public virtual ICollection<GoodsGroupMember> Members { get; set; }
}
public class GoodsGroupMember: AuditableEntity
{
    public Guid Id { get; set; }
    public Guid GoodsGroupId { get; set; }
    public Guid GoodsId { get; set; }
    public virtual GoodsGroup GoodsGroup { get; set; } 
    public virtual Goods Goods { get; set; } 
}
