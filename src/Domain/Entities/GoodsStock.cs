using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace new_usaha.Domain.Entities;

public class GoodsStock
{
    // Recent Stock Info
    public GoodsStock()
    {
        this.AddStockHistories = new HashSet<AddStockHistory>();
    }

    public Guid Id { get; set; }
    public Guid GoodsId { get; set; }
    public virtual Goods Goods { get; set; } 
    public virtual ICollection<AddStockHistory> AddStockHistories { get; set; }
    public int N { get; set; }
    public int Threshold { get; set; }
}
