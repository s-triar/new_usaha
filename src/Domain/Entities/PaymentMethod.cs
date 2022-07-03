using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using new_usaha.Domain.Common;

namespace new_usaha.Domain.Entities;

public class PaymentMethod : AuditableEntity
{
    public PaymentMethod()
    {
        this.Orders = new HashSet<Order>();

    }
    public uint Id { get; set; }
    public string Name { get; set; } 
    public virtual ICollection<Order> Orders { get; set; }

}
