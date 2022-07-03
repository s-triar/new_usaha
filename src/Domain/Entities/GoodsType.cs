using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using new_usaha.Domain.Common;

namespace new_usaha.Domain.Entities;

public class GoodsType : AuditableEntity
{
    public GoodsType()
    {
        this.Goodses = new HashSet<Goods>();
        this.SubGoodsTypes = new HashSet<GoodsType>();
    }
    public int Id { get; set; }
    public string Name { get; set; } 
    public int? ParentGoodsTypeId { get; set; }
    public virtual GoodsType? ParentGoodsType { get; set; }
    public virtual ICollection<Goods> Goodses { get; set; }
    public virtual ICollection<GoodsType> SubGoodsTypes { get; set; }
}
