using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using new_usaha.Application.Common.Interfaces;
using new_usaha.Application.CQRS.Goodses;
using new_usaha.Application.CQRS.Orders.Commands.CreateOrders;

namespace new_usaha.Application.CQRS.Orders.Commands;

public class OrderValidator<T>: AbstractValidator<T>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentEnterpriseService _currentEnterprise;
    private readonly ICurrentUserService _currentUserService;
    private readonly IMapper _mapper;

    public OrderValidator(
        IApplicationDbContext context, 
        ICurrentEnterpriseService currentEnterprise, 
        ICurrentUserService currentUserService, 
        IMapper mapper)
    {
        _context = context;
        _currentEnterprise = currentEnterprise;
        _currentUserService = currentUserService;
        _mapper = mapper;
    }
    public async Task<bool> IsProductOwned(IList<ItemOrdered> Items, CancellationToken cancellationToken)
    {
        var idItems = Items.Select(x => x.GoodsId);
        return await this._context.Goodses
            .AllAsync(x => x.EnterpriseId.ToString() == this._currentEnterprise.EnterpriseId && idItems.Contains(x.Id));
    }
    public async Task<bool> CheckCalculation(decimal Total, decimal Payment, decimal Return, IList<ItemOrdered> Items, CancellationToken cancellationToken)
    {
        var itemIds = Items.Select(x => x.GoodsId).ToList();
        var entities = await this._context.Goodses
                                       .Include(x => x.GoodsPrices)
                                       .Where(x => itemIds.Contains(x.Id))
                                       .ToListAsync(cancellationToken);
        var items = entities.Select(this._mapper.Map<MyGoodsForCashierDto>);
        var checkPrice = items.Join(Items, i => i.Id, I => I.GoodsId, (i, I) => new { i = i, I = I })
            .All(x => x.I.IsWholesalerPrice == 1 ? x.I.PricePerItem == x.i.WholesalerPrice : x.I.PricePerItem == x.i.Price);
        if (!checkPrice)
        {
            return checkPrice;
        }
        var sumTotalPriceItem = Items.Sum(
                x => ((x.PricePerItem - x.DiscountItem) * x.N) - x.DiscountItemTotal
            );
        var checkTotal = Total == sumTotalPriceItem;
        if (!checkTotal)
        {
            return checkTotal;
        }
        return Math.Abs(Total - Payment) == Return;
    }

}
