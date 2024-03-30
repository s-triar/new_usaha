using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using new_usaha.Domain.Common;

namespace new_usaha.Domain.Entities;

//[Obsolete("GoodsRelatedPackaging is not used anymore", true)]
public class GoodsPackaging : AuditableEntity
{

    public int Id { get; set; }
    public string Name { get; set; } 
}
