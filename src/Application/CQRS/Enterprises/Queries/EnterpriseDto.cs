using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using new_usaha.Application.Common.Mappings;
using new_usaha.Application.EnterpriseAddresses;
using new_usaha.Domain.Entities;

namespace new_usaha.Application.CQRS.Enterprises.Queries;

public class EnterpriseDto : IMapFrom<Enterprise>
{
    public Guid Id { get; set; }
    public string Code { get; set; }
    public string Name { get; set; }
    public string? Description { get; set; }
    public string EnterpriseType { get; set; } = null!;
    public string? Photo { get; set; }
    public string Phone { get; set; }
    public string Email { get; set; }
    public EnterpriseAddressDto Address { get; set; }
}
