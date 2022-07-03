using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using new_usaha.Domain.Common;

namespace new_usaha.Domain.Entities;

public class Profit : AuditableEntity
{
    public Guid Id { get; set; }
    public Guid GoodsId { get; set; }
    public Goods Goods { get; set; } 
    public int Value { get; set; }
    public string Reason { get; set; } 
}
