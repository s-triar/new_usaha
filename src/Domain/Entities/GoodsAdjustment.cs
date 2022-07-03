using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace new_usaha.Domain.Entities;

public class GoodsAdjustment: AuditableEntity
{
    public Guid Id { get; set; }
    public Guid GoodsId { get; set; }
    public virtual Goods Goods { get; set; } 
    public int DeltaStock { get; set; }

}
