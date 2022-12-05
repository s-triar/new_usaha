using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace new_usaha.Domain.Entities;
public class GoodsWholesalePrice: AuditableEntity
{
    public Guid Id { get; set; }
    public Guid GoodsId { get; set; }
    public virtual Goods Goods { get; set; }
    public decimal WholesalerPrice { get; set; }
    public int WholesalerMin { get; set; }
    public DateTime Start { get; set; }
    public DateTime? End { get; set; }
}
