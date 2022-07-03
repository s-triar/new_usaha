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

public class UpdateGoodsSellingPriceCommand : IRequest<Guid>
{
    public Guid Id { get; set; }
    public decimal Price { get; set; }
    public decimal WholesalerPrice { get; set; }
    public int WholesalerMin { get; set; }
    public bool IsWholesalerPriceAuto { get; set; }
}
public class UpdateGoodsSellingPriceCommandValidator : GoodsValidator<UpdateGoodsSellingPriceCommand>
{
    public UpdateGoodsSellingPriceCommandValidator(IApplicationDbContext context, ICurrentEnterpriseService currentEnterprise):base(context, currentEnterprise)
    {
        RuleFor(v => v.Id)
            .NotEmpty().WithMessage("Id produk harus diisi.")
            .MustAsync(CheckId).WithMessage("Id produk tidak ditemukan.");
    }
}
public class UpdateGoodsSellingPriceCommandHandler : IRequestHandler<UpdateGoodsSellingPriceCommand, Guid>
{
    private readonly IApplicationDbContext _context;

    public UpdateGoodsSellingPriceCommandHandler(IApplicationDbContext context)
    {
        this._context = context;
    }

    public async Task<Guid> Handle(UpdateGoodsSellingPriceCommand request, CancellationToken cancellationToken)
    {
        this.UpdateOldGoodsPrice(request.Id);
        GoodsPrice entity = this.AddGoodsPrice(request);
        await _context.SaveChangesAsync(cancellationToken);
        //var gd = _context.Goodses.Where(x => x.Id == entity.GoodsId).FirstOrDefault();
        return entity.Id;
    }
    private void UpdateOldGoodsPrice(Guid Id)
    {
        var entity_old = _context.GoodsPrices.Where(x => x.GoodsId == Id).OrderBy(x => x.CreatedAt).LastOrDefault();
        entity_old!.End = new DateTime();
        _context.GoodsPrices.Update(entity_old);
    }
    private GoodsPrice AddGoodsPrice(UpdateGoodsSellingPriceCommand request)
    {
        var entity = new GoodsPrice
        {
            GoodsId = request.Id,
            End = null,
            Price = request.Price,
            Start = new DateTime(),
            WholesalerPrice = request.WholesalerPrice,
            WholesalerMin = request.WholesalerMin,
            IsWholesalerPriceAuto = request.IsWholesalerPriceAuto
        };
        _context.GoodsPrices.Add(entity);
        return entity;
    }
}
