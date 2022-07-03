using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using new_usaha.Application.Common.Interfaces;
using new_usaha.Application.Common.Mappings;
using new_usaha.Domain.Entities;

namespace new_usaha.Application.CQRS.Enterprises;

public class MyEnterpriseDto : IMapFrom<Enterprise>
{

    public Guid Id { get; set; }
    public string Code { get; set; } 
    public string Name { get; set; } 
    public string? Photo { get; set; }
    public string? Phone { get; set; }
    public string? Email { get; set; }
    public string EnterpriseType { get; set; } 
    public string? Address { get; set; }
    public bool Owned { get; set; }
    public void Mapping(Profile profile)
    {
        profile.CreateMap<Enterprise, MyEnterpriseDto>()
               .ConvertUsing<MyEnterpriseConverter>();
        //.ForMember(dest => dest.Address, opts => opts.MapFrom<MyEnterpriseOwnedResolver>());

        //.ForMember(dest => dest.EnterpriseType, opts => opts.MapFrom(x => x.EnterpriseType.Name))

    }
}

public class MyEnterpriseConverter : ITypeConverter<Enterprise, MyEnterpriseDto>
{
    private ICurrentUserService _cs;
    public MyEnterpriseConverter(ICurrentUserService cs)
    {
        _cs = cs;
    }


    public MyEnterpriseDto Convert(Enterprise source, MyEnterpriseDto destination, ResolutionContext context)
    {
        var addr = source.EnterpriseAddresses.Count() > 0 ? source.EnterpriseAddresses.Last() : null;
        return new MyEnterpriseDto
        {
            Address = addr != null ? $"{addr.Street}, {addr.SubDistrict}, {addr.District}, {addr.City}, {addr.Province}, {addr.PostalCode}" : null,
            EnterpriseType = source.EnterpriseType.Name,
            Id = source.Id,
            Name = source.Name,
            Code = source.Code,
            Email=source.Email,
            Phone=source.Phone,
            Photo = source.Photo != null ? source.Photo.Replace("\\", "/") : null,
            Owned = source.UserOwnerId == _cs.UserId ? true : false
        };
    }
}

public class MyEnterpriseOwnedResolver : IValueResolver<Enterprise, MyEnterpriseDto, string>
{
    public string Resolve(Enterprise source, MyEnterpriseDto destination, string destMember, ResolutionContext context)
    {
        return "alamakkk";
    }
}
