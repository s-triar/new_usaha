using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using new_usaha.Domain.Common;

namespace new_usaha.Domain.Entities;

public class Goods : AuditableEntity
{
    public Goods()
    {
        this.GoodsOrdereds = new HashSet<GoodsOrdered>();
        this.GoodsPrices = new HashSet<GoodsPrice>();
        this.GoodsPhotos = new HashSet<GoodsPhoto>();
        this.GoodsProfits = new HashSet<Profit>();
        this.ChildrenGoods = new HashSet<Goods>();
        this.GoodsGroupMembers = new HashSet<GoodsGroupMember>();

    }
    public Guid Id { get; set; }
    public Guid EnterpriseId { get; set; }
    public virtual Enterprise Enterprise { get; set; } 
    public string Name { get; set; } 
    public string? Description { get; set; }
    public int GoodsTypeId { get; set; }
    public virtual GoodsType GoodsType { get; set; } 
    public string Barcode { get; set; } 
    public bool AvailableOnline { get; set; }
    public virtual GoodsStock GoodsStock { get; set; } 
    public int Contain { get; set; } // smaller goods
    public Guid? ParentGoodsId { get; set; }
    public virtual Goods? ParentGoods { get; set; }
    public virtual ICollection<Goods> ChildrenGoods { get; set; }
    public virtual ICollection<GoodsOrdered> GoodsOrdereds { get; set; }
    public virtual ICollection<GoodsPrice> GoodsPrices { get; set; }
    public virtual ICollection<GoodsPhoto> GoodsPhotos { get; set; }
    public virtual ICollection<Profit> GoodsProfits { get; set; }
    public virtual ICollection<GoodsGroupMember> GoodsGroupMembers { get; set; }
}
