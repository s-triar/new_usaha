using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using new_usaha.Domain.Common;

namespace new_usaha.Domain.Entities;

public class GoodsPrice : AuditableEntity
{
    public Guid Id { get; set; }
    public Guid GoodsId { get; set; }
    public virtual Goods Goods { get; set; } 
    public decimal Price { get; set; }
    public DateTime Start { get; set; }
    public DateTime? End { get; set; }
}
