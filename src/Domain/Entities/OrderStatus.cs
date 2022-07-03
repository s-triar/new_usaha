using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using new_usaha.Domain.Common;

namespace new_usaha.Domain.Entities;

public class OrderStatus : AuditableEntity
{
    public OrderStatus()
    {
        this.OrderProgresses = new HashSet<OrderProgress>();
    }
    public uint Id { get; set; }
    public string Name { get; set; } 
    public int NoQueue { get; set; }
    public virtual ICollection<OrderProgress> OrderProgresses { get; set; }
}
