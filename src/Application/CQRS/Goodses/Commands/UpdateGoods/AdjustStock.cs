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

namespace new_usaha.Application.CQRS.Goodses.Commands.UpdateGoods;

//public enum ReasonAdjustStock
//{
//    None, // found old product that can still be sold
//    Lost, //Lost, Broken, Expired
//    Manual //sold manually so the order is not recorded in system
//}
public class AdjustStockCommand : IRequest<Guid>
{
    public Guid Id { get; set; }
    public int ActualStock { get; set; }
    //public ReasonAdjustStock Reason { get; set; }
}
public class AdjustStockCommandValidator : GoodsValidator<AdjustStockCommand>
{
    public AdjustStockCommandValidator(IApplicationDbContext context, ICurrentEnterpriseService currentEnterprise):base(context, currentEnterprise)
    {
        RuleFor(v => v.Id)
            .NotEmpty().WithMessage("Id produk harus diisi.")
            .MustAsync(CheckId).WithMessage("Id produk tidak ditemukan.");
    }
}
public class AdjustStockCommandHandler : IRequestHandler<AdjustStockCommand, Guid>
{
    private readonly IApplicationDbContext _context;
    private ICurrentUserService _cs;
    public AdjustStockCommandHandler(IApplicationDbContext context, ICurrentUserService cs)
    {
        this._context = context;
        this._cs = cs;
    }

    public async Task<Guid> Handle(AdjustStockCommand request, CancellationToken cancellationToken)
    {
        var stock = _context.GoodsStocks.Where(x => x.GoodsId == request.Id).SingleOrDefault();
        var deltaN = stock.N - request.ActualStock;
        //if (deltaN > 0 && request.Reason == ReasonAdjustStock.None)
        //{
        //    this.IncrementStock(deltaN, stock);
        //}
        //else if (request.Reason == ReasonAdjustStock.Manual && deltaN < 0)
        //{
        //    this.DecrementStockCauseManualSelling(deltaN, request.Id);
        //}
        //else
        //{
        //    this.DecrementStock(deltaN, request.Id);
        //}

        stock.N = request.ActualStock;
        _context.GoodsStocks.Update(stock);

        var gdAdj = new GoodsAdjustment
        {
            DeltaStock = deltaN,
            GoodsId = stock.GoodsId
        };
        await _context.GoodsAdjustments.AddAsync(gdAdj);
        await _context.SaveChangesAsync(cancellationToken);
        var gd = _context.Goodses.Where(x=>x.Id==request.Id).FirstOrDefault();
        return stock.GoodsId;
    }
    //private void IncrementStock(int deltaN, GoodsStock stock)
    //{
    //    var stockLastHistory = _context.AddStockHistories.Where(x => x.GoodsStockId == stock.Id).LastOrDefault();
    //    var stockHistory = new AddStockHistory
    //    {
    //        GoodsStockId = stock.Id,
    //        N = deltaN,
    //        PricePerItem = stockLastHistory.PricePerItem,
    //        PriceTotal = stockLastHistory.PricePerItem * deltaN,
    //        PriceChange = 0,
    //        BasePrice = stockLastHistory.BasePrice
    //    };
    //    _context.AddStockHistories.Add(stockHistory);
    //}
    //private void DecrementStockCauseManualSelling(int deltaN, Guid goodsId)
    //{
    //    var goods = this._context.Goodses.Include(x => x.GoodsPrices).Include(x => x.GoodsInfo).Where(x => x.Id == goodsId).FirstOrDefault();
    //    List<GoodsOrdered> goodsOrdered = new List<GoodsOrdered>(){
    //            new GoodsOrdered
    //            {
    //                N=deltaN,
    //                PricePerItem = goods.GoodsPrices.OrderBy(x=>x.CreatedAt).LastOrDefault().Price,
    //                GoodsId=goods.Id,
    //                Name=goods.Name,
    //            }
    //        };
    //    var order = new Order
    //    {
    //        IsOnline = false,
    //        EnterpriseId = goods.GoodsInfo.EnterpriseId,
    //        Total = goods.GoodsPrices.OrderBy(x => x.CreatedAt).LastOrDefault().Price * deltaN,
    //        UserOrderId = null,
    //        GoodsOrdereds = goodsOrdered
    //    };
    //    _context.Orders.Add(order);

    //}
    //private void DecrementStock(int deltaN, Guid goodsId)
    //{
    //    var goods = this._context.Goodses.Include(x => x.GoodsPrices).Include(x => x.GoodsInfo).Where(x => x.Id == goodsId).FirstOrDefault();
    //    List<GoodsOrdered> goodsOrdered = new List<GoodsOrdered>(){
    //            new GoodsOrdered
    //            {
    //                N=deltaN,
    //                PricePerItem = goods.GoodsPrices.OrderBy(x=>x.CreatedAt).LastOrDefault().Price,
    //                GoodsId=goods.Id,
    //                Name=goods.Name,
    //            }
    //        };
    //    var order = new Order
    //    {
    //        IsOnline = false,
    //        EnterpriseId = goods.GoodsInfo.EnterpriseId,
    //        Total = goods.GoodsPrices.OrderBy(x => x.CreatedAt).LastOrDefault().Price * deltaN,
    //        UserOrderId = null,
    //        GoodsOrdereds = goodsOrdered
    //    };
    //    _context.Orders.Add(order);

    //}
}
