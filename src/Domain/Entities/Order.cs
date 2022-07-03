using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using new_usaha.Domain.Common;

namespace new_usaha.Domain.Entities;

public class Order : AuditableEntity
{
    public Order()
    {

        this.OrderProgresses = new HashSet<OrderProgress>();
        this.GoodsOrdereds = new HashSet<GoodsOrdered>();

    }

    public Guid Id { get; set; }
    public Guid EnterpriseId { get; set; }
    public virtual Enterprise Enterprise { get; set; } 
    public decimal Total { get; set; }
    public decimal Payment { get; set; }
    public decimal Return { get; set; }
    public uint PaymentMethodId { get; set; }
    public virtual PaymentMethod PaymentMethod { get; set; } 
    public virtual ICollection<OrderProgress> OrderProgresses { get; set; }
    public virtual ICollection<GoodsOrdered> GoodsOrdereds { get; set; }
    public bool IsOnline { get; set; }
    public Guid? UserOrderId { get; set; }
    public string? To { get; set; }

}
