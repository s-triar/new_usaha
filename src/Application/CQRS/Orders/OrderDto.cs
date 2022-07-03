using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using new_usaha.Application.Common.Mappings;
using new_usaha.Domain.Entities;

namespace new_usaha.Application.CQRS.Orders;

public class OrderDto : IMapFrom<Order>
{
    public Guid Id { get; set; }
    public decimal Total { get; set; }
    public decimal Payment { get; set; }
    public decimal Return { get; set; }
    public string PaymentMethod { get; set; } 
    public string OrderProgress { get; set; } 
    public bool IsOnline { get; set; }
    public DateTime CreatedAt { get; set; }
    public void Mapping(Profile profile)
    {
        profile.CreateMap<Order, OrderDto>()
        .ForMember(dest => dest.Id, opts => opts.MapFrom(x => x.Id))
        .ForMember(dest => dest.Total, opts => opts.MapFrom(x => x.Total))
        .ForMember(dest => dest.Payment, opts => opts.MapFrom(x => x.Payment))
        .ForMember(dest => dest.PaymentMethod, opts => opts.MapFrom(x => x.PaymentMethod.Name))
        .ForMember(dest => dest.Return, opts => opts.MapFrom(x => x.Return))
        .ForMember(dest => dest.OrderProgress, opts => opts.MapFrom(x => x.OrderProgresses.OrderBy(y => y.CreatedAt).Last().OrderStatus.Name))
        .ForMember(dest => dest.IsOnline, opts => opts.MapFrom(x => x.IsOnline))
        .ForMember(dest => dest.CreatedAt, opts => opts.MapFrom(x => x.CreatedAt))
        ;

    }
}
