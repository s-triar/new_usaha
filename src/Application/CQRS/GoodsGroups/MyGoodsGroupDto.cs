using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using new_usaha.Application.Common.Mappings;
using new_usaha.Application.Common.Models;
using new_usaha.Domain.Entities;
namespace new_usaha.Application.CQRS.GoodsGroups;


public class MyGoodsGroupDto : IMapFrom<GoodsGroup>
{
    public Guid Id { get; set; }
    public string Name { get; set; } 
    public List<MyGoodsGroupMemberDto> Members { get; set; } 
    public void Mapping(Profile profile)
    {
        profile.CreateMap<GoodsGroup, MyGoodsGroupDto>()
            .ForMember(dest => dest.Id, opts => opts.MapFrom(x => x.Id))
            .ForMember(dest => dest.Name, opts => opts.MapFrom(x => x.Name));
               //.ConvertUsing<MyGoodsGroupConverter>();
        //.ForMember(dest => dest.Address, opts => opts.MapFrom<MyEnterpriseOwnedResolver>());

        //.ForMember(dest => dest.EnterpriseType, opts => opts.MapFrom(x => x.EnterpriseType.Name))

    }
}


public class MyGoodsGroupMemberDto : IMapFrom<GoodsGroupMember>
{
    public Guid Id { get; set; }
    public string Name { get; set; } 
    public string? PhotoUrl { get; set; }
    public void Mapping(Profile profile)
    {
        profile.CreateMap<GoodsGroupMember, MyGoodsGroupMemberDto>()
               .ForMember(dest => dest.Id, opts => opts.MapFrom(x => x.Id))
               .ForMember(dest => dest.Name, opts => opts.MapFrom(x => x.Goods.Name))
               .ForMember(dest => dest.PhotoUrl, opts => opts.MapFrom(x => x.Goods.GoodsPhotos.OrderBy(x => x.CreatedAt).LastOrDefault() == null ? null : x.Goods.GoodsPhotos.OrderBy(x=>x.CreatedAt).LastOrDefault().Url));
        //.ForMember(dest => dest.Address, opts => opts.MapFrom<MyEnterpriseOwnedResolver>());

        //.ForMember(dest => dest.EnterpriseType, opts => opts.MapFrom(x => x.EnterpriseType.Name))

    }
}


public class MyGoodsGroupConverter : ITypeConverter<GoodsGroup, MyGoodsGroupDto>
{

    public MyGoodsGroupDto Convert(GoodsGroup source, MyGoodsGroupDto destination, ResolutionContext context)
    {
        List<MyGoodsGroupMemberDto> Members = source.Members.Select(x=> new MyGoodsGroupMemberDto() { Id = x.Id,Name=x.Goods.Name, PhotoUrl = x.Goods.GoodsPhotos.LastOrDefault()?.Url}).ToList();
        
        return new MyGoodsGroupDto
        {
            Id = source.Id,
            Name=source.Name,
            Members =Members
        };
    }
}

public class MyGoodsGroupContainerDto : SearchPageResponse<MyGoodsGroupDto>
{
    public MyGoodsGroupContainerDto(List<MyGoodsGroupDto> items, int count, int pageNumber, int pageSize) : base(items, count, pageNumber, pageSize)
    {
    }
}