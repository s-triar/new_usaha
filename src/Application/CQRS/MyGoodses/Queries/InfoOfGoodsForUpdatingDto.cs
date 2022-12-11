using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using new_usaha.Application.Common.Mappings;
using new_usaha.Domain.Entities;

namespace new_usaha.Application.CQRS.MyGoodses.Queries;

public class InfoOfWholesalesForUpdatingDto
{
    public Guid Id { get; set; }
    public decimal WholesalerPrice { get; set; }
    public int WholesalerMin { get; set; }
}
public class InfoOfParentOfGoodsForUpdatingDto
{
    public Guid Id { get; set; }
    public string Barcode { get; set; }
    public string Name { get; set; }
}
public class InfoOfGroupMemberOfGoodsForUpdatingDto
{
    public Guid Id { get; set; }
    public string Barcode { get; set; }
    public string Name { get; set; }
}
public class InfoOfGroupOfGoodsForUpdatingDto
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public List<InfoOfGroupMemberOfGoodsForUpdatingDto> Members { get; set; } = new List<InfoOfGroupMemberOfGoodsForUpdatingDto>();

}

public class MyGoodsInfoDto : IMapFrom<Goods>
{
    public Guid Id { get; set; }
    public Guid EnterpriseId { get; set; }
    public string Barcode { get; set; }
    public string Name { get; set; }
    public int GoodsTypeId { get; set; }
    public string? Description { get; set; }
    public string? Photo { get; set; }
    public int Contain { get; set; } // smaller goods
    public int N { get; set; } // recent stock
    public decimal Price { get; set; }
    public decimal BuyPrice { get; set; }
    public decimal BaseBuyPrice { get; set; }
    public bool IsWholesalerPriceAuto { get; set; }
    public bool AvailableOnline { get; set; }
    public int Threshold { get; set; }
    public InfoOfParentOfGoodsForUpdatingDto? Parent { get; set; }
    public List<InfoOfGroupOfGoodsForUpdatingDto> Groups { get; set; } = new List<InfoOfGroupOfGoodsForUpdatingDto>();
    public List<InfoOfWholesalesForUpdatingDto> WholePrices { get; set; } = new List<InfoOfWholesalesForUpdatingDto>();
    public void Mapping(Profile profile)
    {
        profile.CreateMap<Goods, MyGoodsInfoDto>()
               .ConvertUsing<MyInfoOfGoodsConverter>();

    }
}

public class MyInfoOfGoodsConverter : ITypeConverter<Goods, MyGoodsInfoDto>
{

    public MyGoodsInfoDto Convert(Goods source, MyGoodsInfoDto destination, ResolutionContext context)
    {
        var groups = new List<InfoOfGroupOfGoodsForUpdatingDto>();

        foreach (var i in source.GoodsGroupMembers)
        {
            //var t = i.GoodsGroup.Members.Select(x=> new InfoOfGroupMemberOfGoodsForUpdatingDto { Id = x.GoodsId, Name = x.Goods.Name, Barcode = x.Goods.Barcode }).ToList();
            groups.Add(new InfoOfGroupOfGoodsForUpdatingDto
            {
                Id = i.GoodsGroupId,
                Name = i.GoodsGroup.Name,
                Members = i.GoodsGroup.Members.Select(x => new InfoOfGroupMemberOfGoodsForUpdatingDto { Id = x.GoodsId, Name = x.Goods.Name, Barcode = x.Goods.Barcode }).ToList()
            });
        }

        var goodsPrice = source.GoodsPrices.Where(x=>x.End==null).OrderBy(x=>x.CreatedAt).LastOrDefault()!;

        var wholePrices = new List<InfoOfWholesalesForUpdatingDto>();
        foreach(var i in source.GoodsWholesalePrices.Where(x=>x.End==null).OrderBy(x=>x.WholesalerMin).ToList())
        {
            wholePrices.Add(new InfoOfWholesalesForUpdatingDto
            {
                Id = i.Id,
                WholesalerMin = i.WholesalerMin,
                WholesalerPrice = i.WholesalerPrice
            });
        }

        return new MyGoodsInfoDto
        {
            Id = source.Id,
            EnterpriseId = source.EnterpriseId,
            Name = source.Name,
            Barcode = source.Barcode,
            GoodsTypeId = source.GoodsTypeId,
            Description = source.Description,
            Photo = source.GoodsPhotos.LastOrDefault()?.Url,
            AvailableOnline = source.AvailableOnline,
            Contain = source.Contain,
            Groups = groups,
            Parent = source.ParentGoods != null ? new InfoOfParentOfGoodsForUpdatingDto { Id = source.ParentGoods.Id, Barcode = source.ParentGoods.Barcode, Name = source.ParentGoods.Name } : null,

            N = source.GoodsStock.N,
            Threshold = source.GoodsStock.Threshold,

            BuyPrice = source.GoodsStock.AddStockHistories.LastOrDefault()!.PricePerItem,
            BaseBuyPrice = source.GoodsStock.AddStockHistories.LastOrDefault()!.BasePrice,

            IsWholesalerPriceAuto = source.IsWholesalerPriceAuto,
            Price = goodsPrice.Price,

            WholePrices = wholePrices
            //WholesalerMin = goodsPrice.WholesalerMin,
            //WholesalerPrice = goodsPrice.WholesalerPrice,

        };

    }
}
