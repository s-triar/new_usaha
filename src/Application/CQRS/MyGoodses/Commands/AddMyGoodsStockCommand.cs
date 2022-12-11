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

public class AddMyGoodsStockCommand : IRequest<ResultWithMessage>
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
public class AddMyGoodsStockCommandHandler : IRequestHandler<AddMyGoodsStockCommand, ResultWithMessage>
{
    private readonly IApplicationDbContext _context;

    public AddMyGoodsStockCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<ResultWithMessage> Handle(AddMyGoodsStockCommand request, CancellationToken cancellationToken)
    {
        await this._context.BeginTransactionAsync();
        GoodsStock entity = AddGoodsStock(request);
        await _context.SaveChangesAsync(cancellationToken);
        //var gd = _context.Goodses.Where(x=>x.Id==entity.GoodsId).FirstOrDefault();
        await this._context.CommitTransactionAsync();
        return new ResultWithMessage(true, new List<string>() { }, "Berhasil menambah stock produk");

    }
    private GoodsStock AddGoodsStock(AddMyGoodsStockCommand request)
    {
        var stock = _context.GoodsStocks.Where(x => x.GoodsId == request.Id).SingleOrDefault();
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
        return stock;
    }
}
