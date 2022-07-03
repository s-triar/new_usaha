using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using new_usaha.Application.Common.Mappings;
using new_usaha.Application.Common.Models;
using new_usaha.Domain.Entities;

namespace new_usaha.Application.CQRS.Employees;


public class EnterpriseEmployeeDto : IMapFrom<EnterpriseEmployee>
{
    public string UserId { get; set; }
    public string EmployeeId { get; set; }
    public string EmployeeName { get; set; }
    public string EnterpriseRoleName { get; set; }
    public void Mapping(Profile profile)
    {
        profile.CreateMap<EnterpriseEmployee, EnterpriseEmployeeDto>()
            .ForMember(dest => dest.UserId, opts => opts.MapFrom(x => x.UserId))
            .ForMember(dest => dest.EmployeeId, opts => opts.MapFrom(x => x.Id))
            .ForMember(dest => dest.EmployeeName, opts => opts.MapFrom(x => x.UserName))
            .ForMember(dest => dest.EnterpriseRoleName, opts => opts.MapFrom(x => x.EnterpriseRole.Name));

    }
}
public class EnterpriseEmployeeContainerDto : SearchPageResponse<EnterpriseEmployeeDto>
{
    public EnterpriseEmployeeContainerDto(List<EnterpriseEmployeeDto> items, int count, int pageNumber, int pageSize) : base(items, count, pageNumber, pageSize)
    {
    }
}
