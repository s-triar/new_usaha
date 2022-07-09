using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using new_usaha.Application.Common.Interfaces;
using new_usaha.Application.Common.Mappings;
using new_usaha.Application.Common.Models;
using new_usaha.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace new_usaha.Application.CQRS.Goodses;



public class MyGoodsDto : IMapFrom<Goods>
{
    public Guid Id { get; set; }
    public Guid EnterpriseId { get; set; }
    public string Barcode { get; set; } 
    public string Name { get; set; } 
    public string? Description { get; set; }
    public string? Photo { get; set; }
    public string GoodsType { get; set; } 
    public int Contain { get; set; }
    public decimal Price { get; set; }
    public decimal WholesalerPrice { get; set; }
    public int N { get; set; }
    public string Stock { get; set; } 
    public void Mapping(Profile profile)
    {
        profile.CreateMap<Goods, MyGoodsDto>()
               //.ConvertUsing<MyGoodsConverter>()
               .ForMember(dest=>dest.GoodsType, opts=>opts.MapFrom(x=>x.GoodsType.Name))
               .ForMember(dest => dest.N, opts => opts.MapFrom(x => x.GoodsStock.N))
               //.ForMember(dest => dest.Stock, opts => opts.MapFrom(x => $"Stok: {x.GoodsStock.N}"))
               .ForMember(dest => dest.Stock, opts => opts.MapFrom<MyGoodsStockResolver>())
               .ForMember(dest => dest.Photo, opts => opts.MapFrom(x => x.GoodsPhotos.Count() > 0 ? x.GoodsPhotos.OrderBy(y=>y.CreatedAt).LastOrDefault()!.Url : null))
               .ForMember(dest => dest.Price, opts => opts.MapFrom(x => x.GoodsPrices.OrderBy(y=>y.CreatedAt).LastOrDefault()!.Price))
               .ForMember(dest => dest.WholesalerPrice, opts => opts.MapFrom(x => x.GoodsPrices.OrderBy(y=>y.CreatedAt).LastOrDefault()!.WholesalerPrice))
               ;
        //.ForMember(dest => dest.Address, opts => opts.MapFrom<MyEnterpriseOwnedResolver>());

        //.ForMember(dest => dest.EnterpriseType, opts => opts.MapFrom(x => x.EnterpriseType.Name))

    }
}
public class MyGoodsStockResolver : IValueResolver<Goods, MyGoodsDto, string>
{
    //public string Resolve(Enterprise source, MyEnterpriseDto destination, string destMember, ResolutionContext context)
    //{
    //    return "alamakkk";
    //}
    private readonly IApplicationDbContext _context;
    public MyGoodsStockResolver(IApplicationDbContext context)
    {
        _context = context;
    }
    public string Resolve(Goods source, MyGoodsDto destination, string destMember, ResolutionContext context)
    {
        string stock = "";
        stock += $"Stok: {source.GoodsStock.N} << ";

        Goods? pt = source.ParentGoods;
        decimal n_stock = source.GoodsStock.N;
        decimal n_contain = 1;
        while (pt != null)
        {
            n_contain *= pt.Contain;
            var temp = this._context.Goodses.Include(x => x.ParentGoods).Include(x => x.GoodsStock).FirstOrDefault(x => x.Id == pt.Id);
            n_stock += n_contain * temp.GoodsStock.N;
            pt = pt.ParentGoods;
        }
        stock += $"{n_stock}";
        return stock;
    }
}

public class MyGoodsConverter : ITypeConverter<Goods, MyGoodsDto>
{
    private readonly IApplicationDbContext _context;
    public MyGoodsConverter(IApplicationDbContext context)
    {
        _context = context;
    }
    public MyGoodsDto Convert(Goods source, MyGoodsDto destination, ResolutionContext context)
    {
        string stock = "";
        stock += $"Stok: {source.GoodsStock.N} yy ";

        Goods? pt = source.ParentGoods;
        decimal n_stock = source.GoodsStock.N;
        decimal n_contain = 1;
        while (pt != null)
        {
            n_contain *= pt.Contain;
            var temp = this._context.Goodses.Include(x=>x.ParentGoods).Include(x => x.GoodsStock).FirstOrDefault(x => x.Id == pt.Id);
            n_stock += n_contain * temp.GoodsStock.N;
            pt = pt.ParentGoods;
        }
        stock += $"{n_stock}";

        return new MyGoodsDto
        {
            Id = source.Id,
            EnterpriseId = source.EnterpriseId,
            Barcode = source.Barcode,
            Contain = source.Contain,
            Description = source.Description,
            GoodsType = source.GoodsType.Name,
            N = source.GoodsStock.N,
            Name = source.Name,
            Photo = source.GoodsPhotos.Count() > 0 ? source.GoodsPhotos.OrderBy(y => y.CreatedAt).LastOrDefault()!.Url : null,
            Price = source.GoodsPrices.OrderBy(y=>y.CreatedAt).LastOrDefault()!.Price,
            WholesalerPrice = source.GoodsPrices.OrderBy(y=>y.CreatedAt).LastOrDefault()!.WholesalerPrice,
            Stock = stock
        };
    }
}
public class MyGoodsesContainerDto : SearchPageResponse<MyGoodsDto>
{
    public MyGoodsesContainerDto(List<MyGoodsDto> items, int count, int pageNumber, int pageSize) : base(items, count, pageNumber, pageSize)
    {
    }
}
