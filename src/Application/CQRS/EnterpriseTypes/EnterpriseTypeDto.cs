using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using new_usaha.Application.Common.Mappings;
using new_usaha.Domain.Entities;
namespace new_usaha.Application.CQRS.EnterpriseTypes;

public class EnterpriseTypeDto : IMapFrom<EnterpriseType>
{
    public int Id { get; set; }
    public string Name { get; set; } 
    public string Provide { get; set; } 
}
