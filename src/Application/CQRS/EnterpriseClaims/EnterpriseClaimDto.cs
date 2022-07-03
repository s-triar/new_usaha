using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using new_usaha.Application.Common.Mappings;
using new_usaha.Domain.Entities;

namespace new_usaha.Application.CQRS.EnterpriseClaims;

public class EnterpriseClaimDto : IMapFrom<EnterpriseClaim>
{
    public Guid Id { get; set; }
    public string Context { get; set; } 
    public string Feature { get; set; } 
    public string Action { get; set; } 
    public string Description { get; set; } 
    public void Mapping(Profile profile)
    {
        profile.CreateMap<EnterpriseClaim, EnterpriseClaimDto>()
        .ForMember(dest => dest.Id, opts => opts.MapFrom(x => x.Id))
        .ForMember(dest => dest.Context, opts => opts.MapFrom(x => x.Context))
        .ForMember(dest => dest.Feature, opts => opts.MapFrom(x => x.Feature))
        .ForMember(dest => dest.Action, opts => opts.MapFrom(x => x.Action))
        .ForMember(dest => dest.Description, opts => opts.MapFrom(x => x.Description));

    }
}
