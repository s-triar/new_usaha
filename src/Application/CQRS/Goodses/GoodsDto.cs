using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace new_usaha.Application.Goodses;

public class GoodsDto
{
    public Guid Id { get; set; }
    public Guid EnterpriseId { get; set; }
    public string Barcode { get; set; } 
    public string Name { get; set; } 
    public string? Description { get; set; } 
    public string? Photo { get; set; } 
    public string GoodsType { get; set; } 
    public string GoodsPackaging { get; set; } 
    public int Contain { get; set; }
}
