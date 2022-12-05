using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using new_usaha.Application.Common.Interfaces;
using new_usaha.Domain.Entities;
using new_usaha.Application.CQRS.MyGoodses.Queries;

namespace new_usaha.Application.CQRS.Orders.Commands.CreateOrders;

public class ItemOrdered
{
    public Guid GoodsId { get; set; }
    public int IsWholesalerPrice { get; set; }
    public decimal DiscountItem { get; set; }
    public decimal DiscountItemTotal { get; set; }
    public decimal PricePerItem { get; set; }
    public decimal PricePerItemAfterDiscount { get; set; }
    public decimal PriceTotal { get; set; }
    public decimal PriceTotalAfterDiscount { get; set; }
    public decimal PriceTotalFinal { get; set; }
    public int N { get; set; }
}
public class CreateOrderCashierCommand : IRequest<Guid>
{
    public decimal Total { get; set; }
    public decimal Payment { get; set; }
    public decimal Return { get; set; }
    public string To { get; set; }
    public IList<ItemOrdered> Items { get; set; }
}
class CreateOrderCahsierCommandValidator : OrderValidator<CreateOrderCashierCommand>
{
    private readonly IApplicationDbContext context;
    private readonly IMapper mapper;

    public CreateOrderCahsierCommandValidator(
        IApplicationDbContext context, 
        ICurrentEnterpriseService currentEnterprise,
        ICurrentUserService currentUserService,
        IMapper mapper): base(context, currentEnterprise, currentUserService, mapper)
    {
        this.context = context;
        this.mapper = mapper;
        RuleFor(v => v.Items)
            .NotEmpty()
            .WithMessage("Harus mempunyai item yang terjual");
        RuleFor(v => v.Items)
            .MustAsync((model, Items, cancelToken) => { return this.IsProductOwned(Items, cancelToken); })
            .WithMessage("Ada item yang bukan milik usaha ini.");

        RuleFor(v => v.Items)
            .MustAsync((model, Items, cancelToken) => { return this.CheckCalculation(model.Total, model.Payment, model.Return, Items, cancelToken); })
            .WithMessage("Ada item yang bukan milik usaha ini.");
    }
}

public class CreateOrderCashierCommandHandler : IRequestHandler<CreateOrderCashierCommand, Guid>
{
    private readonly IApplicationDbContext context;
    private readonly ICurrentEnterpriseService _currentEnterprise;
    private readonly IMapper mapper;

    public CreateOrderCashierCommandHandler(
        IApplicationDbContext context,
        ICurrentEnterpriseService currentEnterprise,
        IMapper mapper)
    {
        this.context = context;
        _currentEnterprise = currentEnterprise;
        this.mapper = mapper;
    }
    public async Task<Guid> Handle(CreateOrderCashierCommand request, CancellationToken cancellationToken)
    {
        var order = await this.CreateOrder(request, cancellationToken);
        await this.CreateOrderItem(order, request.Items, cancellationToken);
        await this.CreateProgressOrder(order, cancellationToken);
        return order.Id;
    }
    private async Task CreateProgressOrder(Order order, CancellationToken cancellationToken)
    {
        var orderProgress = new OrderProgress
        {
            OrderId = order.Id,
            OrderStatusId = 5
        };
        this.context.OrderProgresses.Add(orderProgress);
        await this.context.SaveChangesAsync(cancellationToken);
    }
    private async Task<Order> CreateOrder(CreateOrderCashierCommand request, CancellationToken cancellationToken)
    {
        var order = new Order
        {
            EnterpriseId = Guid.Parse(this._currentEnterprise.EnterpriseId),
            IsOnline = false,
            UserOrderId = null,
            To = request.To,
            Total = request.Total,
            Return = request.Return,
            PaymentMethodId = 1, // Cash
            Payment = request.Payment,
        };
        this.context.Orders.Add(order);
        await this.context.SaveChangesAsync(cancellationToken);
        return order;
    }
    private async Task CreateOrderItem(Order order, IList<ItemOrdered> Items, CancellationToken cancellationToken)
    {
        var goodsIds = Items.Select(x => x.GoodsId).ToList();
        var goods = await this.context.Goodses
                                      .Include(x => x.GoodsPrices)
                                      .Where(x => goodsIds.Contains(x.Id))
                                      .ToListAsync(cancellationToken);
        var items = goods.Select(this.mapper.Map<MyGoodsForCashierDto>);
        foreach (var i in Items)
        {
            var goodsOrdered = new GoodsOrdered
            {
                OrderId = order.Id,
                GoodsId = i.GoodsId,
                DiscountItem = i.DiscountItem,
                DiscountItemTotal = i.DiscountItemTotal,
                IsWholesalerPrice = i.IsWholesalerPrice == 1,
                N = i.N,
                Name = items.First(x => x.Id == i.GoodsId).Name,
                PricePerItem = i.PricePerItem,
                PricePerItemAfterDiscount = i.PricePerItemAfterDiscount,
                PriceTotal = i.PriceTotal,
                PriceTotalAfterDiscount = i.PriceTotalAfterDiscount,
                PriceTotalFinal = i.PriceTotalFinal
            };
            this.context.GoodsOrdereds.Add(goodsOrdered);
        }
        await this.context.SaveChangesAsync(cancellationToken);
    }
}
