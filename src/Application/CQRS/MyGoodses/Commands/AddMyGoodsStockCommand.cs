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
using new_usaha.Application.Common.Models;

namespace new_usaha.Application.CQRS.MyGoodses.Commands;

public class AddMyGoodsStockCommand : IRequest<Unit>
{
    public Guid Id { get; set; }

    public int Increment { get; set; }
    public decimal BuyPriceTotal { get; set; }
}
public class AddMyGoodsStockCommandValidator : GoodsValidator<AddMyGoodsStockCommand>
{
    public AddMyGoodsStockCommandValidator(IApplicationDbContext context, ICurrentEnterpriseService currentEnterprise) : base(context, currentEnterprise)
    {
        RuleFor(v => v.Id)
            .NotEmpty().WithMessage("Id produk harus diisi.")
            .MustAsync(CheckId).WithMessage("Id produk tidak ditemukan.");
    }
}
public class AddMyGoodsStockCommandHandler : IRequestHandler<AddMyGoodsStockCommand, Unit>
{
    private readonly IApplicationDbContext _context;

    public AddMyGoodsStockCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(AddMyGoodsStockCommand request, CancellationToken cancellationToken)
    {
        await this._context.BeginTransactionAsync();
        await this.AddGoodsStock(request);
        await _context.SaveChangesAsync(cancellationToken);
        //var gd = _context.Goodses.Where(x=>x.Id==entity.GoodsId).FirstOrDefault();
        await this._context.CommitTransactionAsync();
        //return new ResultWithMessage(true, new List<string>() { }, "Berhasil menambah stock produk");
        return Unit.Value;

    }
    private async Task ChangeBuyPriceTheChildrens(Guid GoodsId, decimal PricePerItemParent, int incrementParent, int parentContent)
    {
        var goods = await this._context.Goodses.Include(x => x.ChildrenGoods).Where(x => x.Id == GoodsId).SingleOrDefaultAsync();
        if(goods.ChildrenGoods!=null && goods.ChildrenGoods.Count() > 0)
        {
            for (int i = 0; i < goods.ChildrenGoods.Count(); i++)
            {
                var temp = goods.ChildrenGoods.ElementAt(i);
                var stock = _context.GoodsStocks.Where(x => x.GoodsId == temp.Id).SingleOrDefault();
                var stockLastHistory = _context.AddStockHistories.Where(x => x.GoodsStockId == stock.Id).OrderBy(x => x.CreatedAt).LastOrDefault();
                decimal priceperitem = parentContent > 0 ? PricePerItemParent / parentContent : PricePerItemParent;
                var stockHistory = new AddStockHistory
                {
                    GoodsStockId = stock.Id,
                    N = 0,
                    PricePerItem = priceperitem,
                    PriceTotal = priceperitem*(incrementParent* parentContent),
                    PriceChange = priceperitem - stockLastHistory.PricePerItem,
                    BasePrice = (stockLastHistory.BasePrice * stock.N + (priceperitem * (incrementParent * parentContent))) / (stock.N + (incrementParent * parentContent))
                };
                _context.AddStockHistories.Add(stockHistory);
                await ChangeBuyPriceTheChildrens(temp.Id, priceperitem, (incrementParent* parentContent),  temp.Contain);
            }
            
        }
    }

    private async Task ChangeBuyPriceTheParents(Guid GoodsId, decimal PricePerItemChild)
    {
        var goods = await this._context.Goodses.Include(x => x.ParentGoods).Where(x => x.Id == GoodsId).SingleOrDefaultAsync();
        if (goods.ParentGoods != null)
        {
            
            var temp = goods.ParentGoods;
            var stock = _context.GoodsStocks.Where(x => x.GoodsId == temp.Id).SingleOrDefault();
            var stockLastHistory = _context.AddStockHistories.Where(x => x.GoodsStockId == stock.Id).OrderBy(x => x.CreatedAt).LastOrDefault();
            decimal priceperitem = temp.Contain > 0 ? PricePerItemChild * temp.Contain : PricePerItemChild;

            var stockHistory = new AddStockHistory
            {
                GoodsStockId = stock.Id,
                N = 0,
                PricePerItem = priceperitem,
                PriceTotal = priceperitem * 0,
                PriceChange = priceperitem - stockLastHistory.PricePerItem,
                BasePrice = (stockLastHistory.BasePrice * stock.N + 0) / (stock.N + 0)
            };
            _context.AddStockHistories.Add(stockHistory);
            await ChangeBuyPriceTheParents(temp.Id, priceperitem);
        }
    }

    private async Task AddGoodsStock(AddMyGoodsStockCommand request)
    {
        var stock = _context.GoodsStocks.Include(x=>x.Goods).Where(x => x.GoodsId == request.Id).SingleOrDefault();
        var stockLastHistory = _context.AddStockHistories.Where(x => x.GoodsStockId == stock.Id).OrderBy(x => x.CreatedAt).LastOrDefault();
        var stockHistory = new AddStockHistory
        {
            GoodsStockId = stock.Id,
            N = request.Increment,
            PricePerItem = request.BuyPriceTotal / request.Increment,
            PriceTotal = request.BuyPriceTotal,
            PriceChange = request.BuyPriceTotal / request.Increment - stockLastHistory.PricePerItem,
            BasePrice = (stockLastHistory.BasePrice * stock.N + request.BuyPriceTotal) / (stock.N + request.Increment)
        };

        stock.N = stock.N + request.Increment;
        _context.GoodsStocks.Update(stock);
        _context.AddStockHistories.Add(stockHistory);

        await this.ChangeBuyPriceTheParents(request.Id, request.BuyPriceTotal / request.Increment);
        await this.ChangeBuyPriceTheChildrens(request.Id, request.BuyPriceTotal / request.Increment, request.Increment, stock.Goods.Contain);
        
    }
}
