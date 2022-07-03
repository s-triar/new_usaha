using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using new_usaha.Application.Common.Mappings;
using new_usaha.Application.Common.Models;
using new_usaha.Domain.Entities;

namespace new_usaha.Application.CQRS.EnterpriseClaims;

public class EnterpriseRoleContainerDto : SearchPageResponse<EnterpriseRoleDto>
{
    public EnterpriseRoleContainerDto(List<EnterpriseRoleDto> items, int count, int pageNumber, int pageSize) : base(items, count, pageNumber, pageSize)
    {
    }
}
public class EnterpriseRoleDto : IMapFrom<EnterpriseRole>
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public void Mapping(Profile profile)
    {
        profile.CreateMap<EnterpriseRole, EnterpriseRoleDto>()
            .ForMember(dest => dest.Id, opts => opts.MapFrom(x => x.Id))
            .ForMember(dest => dest.Name, opts => opts.MapFrom(x => x.Name));

    }

    public static explicit operator EnterpriseRoleDto(SearchPageResponse<EnterpriseRoleDto> v)
    {
        throw new NotImplementedException();
    }
}
