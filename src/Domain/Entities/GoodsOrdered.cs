using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace new_usaha.Domain.Entities;

public class GoodsOrdered
{

    public Guid Id { get; set; }
    public Guid OrderId { get; set; }
    public virtual Order Order { get; set; } 
    public Guid GoodsId { get; set; }
    public virtual Goods Goods { get; set; } 
    public string Name { get; set; } 
    public bool IsWholesalerPrice { get; set; }
    public decimal DiscountItem { get; set; }
    public decimal DiscountItemTotal { get; set; }
    public decimal PricePerItem { get; set; }
    public decimal PricePerItemAfterDiscount { get; set; }
    public decimal PriceTotal { get; set; }
    public decimal PriceTotalAfterDiscount { get; set; }
    public decimal PriceTotalFinal { get; set; }
    public int N { get; set; }
}
