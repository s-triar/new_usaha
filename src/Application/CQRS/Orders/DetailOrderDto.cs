using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using new_usaha.Application.Common.Mappings;
using new_usaha.Domain.Entities;

namespace new_usaha.Application.CQRS.Orders;

public class DetailOrderDto : IMapFrom<Order>
{
    public Guid Id { get; set; }
    public decimal Total { get; set; }
    public decimal Payment { get; set; }
    public decimal Return { get; set; }
    public string PaymentMethodName { get; set; } 
    public IEnumerable<OrderProgressList>? OrderProgresses { get; set; }
    public bool IsOnline { get; set; }
    public DateTime CreatedAt { get; set; }
    public IEnumerable<OrderGoodsList>? GoodsOrdereds { get; set; }
    public string? To { get; set; }
    public string CreatedById { get; set; } 
    public string CreatedByName { get; set; } 
    public void Mapping(Profile profile)
    {
        profile.CreateMap<Order, DetailOrderDto>()
            .ConvertUsing<EnterpriseOrderDetailConverter>();

    }
}

public class EnterpriseOrderDetailConverter : ITypeConverter<Order, DetailOrderDto>
{
    private readonly IMapper mapper;

    public EnterpriseOrderDetailConverter(IMapper mapper)
    {
        this.mapper = mapper;
    }
    public DetailOrderDto Convert(Order source, DetailOrderDto destination, ResolutionContext context)
    {
        return new DetailOrderDto
        {
            Id = source.Id,
            CreatedAt = source.CreatedAt,
            IsOnline = source.IsOnline,
            Payment = source.Payment,
            Total = source.Total,
            Return = source.Return,
            PaymentMethodName = source.PaymentMethod!.Name,
            CreatedById = source.CreatedBy!,
            To = source.To,
            CreatedByName = source.CreatedBy!,
            OrderProgresses = source.OrderProgresses.OrderBy(x => x.CreatedAt).ToList().Select(this.mapper.Map<OrderProgressList>),
            GoodsOrdereds = source.GoodsOrdereds.OrderBy(x => x.Name).ToList().Select(this.mapper.Map<OrderGoodsList>),
        };
    }
}

public class OrderProgressList : IMapFrom<OrderProgress>
{
    public Guid Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public string Name { get; set; }
    public void Mapping(Profile profile)
    {
        profile.CreateMap<OrderProgress, OrderProgressList>()
            .ForMember(dest => dest.Name, src => src.MapFrom(x => x.OrderStatus.Name));
    }
}
public class OrderGoodsList : IMapFrom<GoodsOrdered>
{
    public Guid Id { get; set; }
    public string Barcode { get; set; }
    public string Name { get; set; }
    public bool IsWholesalerPrice { get; set; }
    public decimal DiscountItem { get; set; }
    public decimal DiscountItemTotal { get; set; }
    public decimal PricePerItem { get; set; }
    public decimal PricePerItemAfterDiscount { get; set; }
    public decimal PriceTotal { get; set; }
    public decimal PriceTotalAfterDiscount { get; set; }
    public decimal PriceTotalFinal { get; set; }
    public int N { get; set; }
    public void Mapping(Profile profile)
    {
        profile.CreateMap<GoodsOrdered, OrderGoodsList>()
            .ForMember(dest => dest.Barcode, src => src.MapFrom(x => x.Goods.Barcode))
            //.ForMember(dest => dest.Id, src => src.MapFrom(x => x.Id))
            //.ForMember(dest => dest.Name, src => src.MapFrom(x => x.Name))
            //.ForMember(dest => dest.IsWholesalerPrice, src => src.MapFrom(x => x.IsWholesalerPrice))
            //.ForMember(dest => dest.DiscountItem, src => src.MapFrom(x => x.DiscountItem))
            //.ForMember(dest => dest.DiscountItemTotal, src => src.MapFrom(x => x.DiscountItemTotal))
            //.ForMember(dest => dest.PricePerItem, src => src.MapFrom(x => x.PricePerItem))
            //.ForMember(dest => dest.PricePerItemAfterDiscount, src => src.MapFrom(x => x.PricePerItemAfterDiscount))
            //.ForMember(dest => dest.PriceTotal, src => src.MapFrom(x => x.PriceTotal))
            //.ForMember(dest => dest.PriceTotalAfterDiscount, src => src.MapFrom(x => x.PriceTotalAfterDiscount))
            //.ForMember(dest => dest.PriceTotalFinal, src => src.MapFrom(x => x.PriceTotalFinal))
            //.ForMember(dest => dest.N, src => src.MapFrom(x => x.N))
            ;

    }
}
