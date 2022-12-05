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

namespace new_usaha.Application.CQRS.MyGoodses.Commands;

public class AddStockCommand : IRequest<Guid>
{
    public Guid Id { get; set; }

    public int Increment { get; set; }
    public decimal BuyPriceTotal { get; set; }
}
public class AddStockCommandValidator : GoodsValidator<AddStockCommand>
{
    public AddStockCommandValidator(IApplicationDbContext context, ICurrentEnterpriseService currentEnterprise) : base(context, currentEnterprise)
    {
        RuleFor(v => v.Id)
            .NotEmpty().WithMessage("Id produk harus diisi.")
            .MustAsync(CheckId).WithMessage("Id produk tidak ditemukan.");
    }
}
public class AddStockCommandHandler : IRequestHandler<AddStockCommand, Guid>
{
    private readonly IApplicationDbContext _context;

    public AddStockCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Guid> Handle(AddStockCommand request, CancellationToken cancellationToken)
    {
        GoodsStock entity = AddGoodsStock(request);
        await _context.SaveChangesAsync(cancellationToken);
        //var gd = _context.Goodses.Where(x=>x.Id==entity.GoodsId).FirstOrDefault();
        return entity.Id;
    }
    private GoodsStock AddGoodsStock(AddStockCommand request)
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
