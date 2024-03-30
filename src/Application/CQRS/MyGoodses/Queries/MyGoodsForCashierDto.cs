using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using new_usaha.Application.Common.Mappings;
using new_usaha.Domain.Entities;

namespace new_usaha.Application.CQRS.MyGoodses.Queries;

public class MyGoodsForCashierDto : IMapFrom<Goods>
{
    public Guid Id { get; set; }
    public Guid EnterpriseId { get; set; }
    public Guid GoodsContainerId { get; set; }
    public string Barcode { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
    public List<WholesalesPrice> WholessalePrices {get;set;}
    //public decimal WholesalerPrice { get; set; }
    //public int WholesalerMin { get; set; }
    public bool IsWholesalerPriceAuto { get; set; }
    public void Mapping(Profile profile)
    {
        profile.CreateMap<Goods, MyGoodsForCashierDto>()
               .ConvertUsing<MyGoodsCashierConverter>();
        //.ForMember(dest => dest.Address, opts => opts.MapFrom<MyEnterpriseOwnedResolver>());

        //.ForMember(dest => dest.EnterpriseType, opts => opts.MapFrom(x => x.EnterpriseType.Name))

    }

}
public class MyGoodsCashierConverter : ITypeConverter<Goods, MyGoodsForCashierDto>
{

    public MyGoodsForCashierDto Convert(Goods source, MyGoodsForCashierDto destination, ResolutionContext context)
    {
        var lastPrice = source.GoodsPrices.LastOrDefault();
        return new MyGoodsForCashierDto
        {
            Id = source.Id,
            EnterpriseId = source.GoodsContainer.EnterpriseId,
            GoodsContainerId = source.GoodsContainerId,
            Barcode = source.Barcode,
            Name = source.Name,
            Price = source.GoodsPrices.Where(x=>x.End==null).OrderBy(x=>x.CreatedAt).LastOrDefault()!.Price,
            WholessalePrices =  source.GoodsWholesalePrices.Where(x=>x.End == null).OrderBy(x=>x.WholesalerMin).Select(x=> new WholesalesPrice { WholesalerMin=x.WholesalerMin, WholesalerPrice=x.WholesalerPrice}).ToList(),
            //WholesalerPrice = lastPrice.WholesalerPrice,
            //WholesalerMin = lastPrice.WholesalerMin,
            IsWholesalerPriceAuto = source.IsWholesalerPriceAuto,
        };
    }
}
