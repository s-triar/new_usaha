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

//public enum ReasonAdjustStock
//{
//    None, // found old product that can still be sold
//    Lost, //Lost, Broken, Expired
//    Manual //sold manually so the order is not recorded in system
//}
public class AdjustMyGoodsStockCommand : IRequest<Unit>
{
    public Guid Id { get; set; }
    public int ActualStock { get; set; }
    
}
public class AdjustStockCommandValidator : GoodsValidator<AdjustMyGoodsStockCommand>
{
    public AdjustStockCommandValidator(IApplicationDbContext context, ICurrentEnterpriseService currentEnterprise) : base(context, currentEnterprise)
    {
        RuleFor(v => v.Id)
            .NotEmpty().WithMessage("Id produk harus diisi.")
            .MustAsync(CheckId).WithMessage("Id produk tidak ditemukan.");
    }
}
public class AdjustStockCommandHandler : IRequestHandler<AdjustMyGoodsStockCommand, Unit>
{
    private readonly IApplicationDbContext _context;
    private ICurrentUserService _cs;
    public AdjustStockCommandHandler(IApplicationDbContext context, ICurrentUserService cs)
    {
        _context = context;
        _cs = cs;
    }

    public async Task<Unit> Handle(AdjustMyGoodsStockCommand request, CancellationToken cancellationToken)
    {
        await this._context.BeginTransactionAsync();
        var stock = _context.GoodsStocks.Where(x => x.GoodsId == request.Id).SingleOrDefault();
        var deltaN = stock.N - request.ActualStock;
        stock.N = request.ActualStock;
        _context.GoodsStocks.Update(stock);

        var gdAdj = new GoodsAdjustment
        {
            DeltaStock = deltaN,
            GoodsId = stock.GoodsId
        };
        await _context.GoodsAdjustments.AddAsync(gdAdj);
        await _context.SaveChangesAsync(cancellationToken);
        var gd = _context.Goodses.Where(x => x.Id == request.Id).FirstOrDefault();
        await this._context.CommitTransactionAsync();
        //return new ResultWithMessage(true, new List<string>() { }, "Berhasil mengatur stok produk");
        return Unit.Value;

    }
}
