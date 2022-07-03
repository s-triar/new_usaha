using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using new_usaha.Application.Common.Mappings;
using new_usaha.Domain.Entities;

namespace new_usaha.Application.CQRS.EnterpriseClaims;

public class EnterpriseRoleDetailDto : IMapFrom<EnterpriseRole>
{
    public Guid Id { get; set; }
    public string Name { get; set; } 
    public IEnumerable<Guid> Claims { get; set; } 
    public void Mapping(Profile profile)
    {
        profile.CreateMap<EnterpriseRole, EnterpriseRoleDetailDto>()
        .ForMember(dest => dest.Id, opts => opts.MapFrom(x => x.Id))
        .ForMember(dest => dest.Name, opts => opts.MapFrom(x => x.Name))
        .ForMember(dest => dest.Claims, opts => opts.MapFrom(x => x.EnterpriseRoleClaims.Select(y => y.EnterpriseClaimId)));
    }
}
