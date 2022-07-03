using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using new_usaha.Domain.Common;

namespace new_usaha.Domain.Entities;

public class AddStockHistory : AuditableEntity
{

    public Guid Id { get; set; }
    public Guid GoodsStockId { get; set; }
    public virtual GoodsStock GoodsStock { get; set; } 
    public int N { get; set; }
    public decimal PriceChange { get; set; }
    public decimal BasePrice { get; set; }
    public decimal PricePerItem { get; set; }
    public decimal PriceTotal { get; set; }
}

