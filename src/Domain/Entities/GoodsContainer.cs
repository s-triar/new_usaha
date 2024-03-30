using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace new_usaha.Domain.Entities;
public class GoodsContainer : AuditableEntity
{
    public GoodsContainer()
    {
        this.ListGoods = new HashSet<Goods>();

    }
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string? Description { get; set; }
    public Guid EnterpriseId { get; set; }
    public virtual Enterprise Enterprise { get; set; }
    public int GoodsTypeId { get; set; }
    public virtual GoodsType GoodsType { get; set; }
    public virtual ICollection<Goods> ListGoods { get; set; }
}
