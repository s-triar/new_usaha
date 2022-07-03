using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using new_usaha.Domain.Common;

namespace new_usaha.Domain.Entities;

public class OrderProgress : AuditableEntity
{
    public Guid Id { get; set; }
    public Guid OrderId { get; set; }
    public virtual Order Order { get; set; } 
    public uint OrderStatusId { get; set; }
    public virtual OrderStatus OrderStatus { get; set; } 
}
