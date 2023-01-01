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


public class UpdateMyGoodsWholesalePrice
{
    public decimal WholesalerPrice { get; set; }
    public int WholesalerMin { get; set; }
}

public class UpdateMyGoodsSellingPriceCommand : IRequest<Unit>
{
    public Guid Id { get; set; }
    public decimal Price { get; set; }
    public IEnumerable<UpdateMyGoodsWholesalePrice> WholesalePrices { get; set; }
}
public class UpdateMyGoodsSellingPriceCommandValidator : GoodsValidator<UpdateMyGoodsSellingPriceCommand>
{
    public UpdateMyGoodsSellingPriceCommandValidator(IApplicationDbContext context, ICurrentEnterpriseService currentEnterprise) : base(context, currentEnterprise)
    {
        RuleFor(v => v.Id)
            .NotEmpty().WithMessage("Id produk harus diisi.")
            .MustAsync(CheckId).WithMessage("Id produk tidak ditemukan.");
    }
}
public class UpdateMyGoodsSellingPriceCommandHandler : IRequestHandler<UpdateMyGoodsSellingPriceCommand, Unit>
{
    private readonly IApplicationDbContext _context;
    private readonly IDateTime _tanggal;

    public UpdateMyGoodsSellingPriceCommandHandler(IApplicationDbContext context, IDateTime tanggal)
    {
        _context = context;
        _tanggal = tanggal;
    }

    public async Task<Unit> Handle(UpdateMyGoodsSellingPriceCommand request, CancellationToken cancellationToken)
    {
        await this._context.BeginTransactionAsync();
        UpdateOldGoodsPrice(request.Id);
        AddGoodsPrice(request);
        //if (request.WholesalePrices.Count() > 0)
        //{
            UpdateOldGoodsWholesalePrice(request.Id);
            AddGWholesalePrice(request.Id, request.WholesalePrices);
        //}
        await _context.SaveChangesAsync(cancellationToken);
        await this._context.CommitTransactionAsync();
        //return new ResultWithMessage(true, new List<string>() { }, "Pembaruan harga produk berhasil");
        return Unit.Value;
    }
    private void UpdateOldGoodsPrice(Guid Id)
    {
        var entity_old = _context.GoodsPrices.Where(x => x.GoodsId == Id).Where(x => x.End == null).OrderBy(x => x.CreatedAt).LastOrDefault();
        entity_old!.End = this._tanggal.Now;
        _context.GoodsPrices.Update(entity_old);
    }
    private void UpdateOldGoodsWholesalePrice(Guid Id)
    {
        var entity_olds = _context.GoodsWholesalePrices.Where(x => x.GoodsId == Id).Where(x=>x.End==null).OrderBy(x => x.CreatedAt).ToList();
        foreach(var entity_old in entity_olds)
        {
            entity_old!.End = this._tanggal.Now;
            _context.GoodsWholesalePrices.Update(entity_old);
        }
    }
    private void AddGoodsPrice(UpdateMyGoodsSellingPriceCommand request)
    {
        var entity = new GoodsPrice
        {
            GoodsId = request.Id,
            End = null,
            Price = request.Price,
            Start = this._tanggal.Now
        };
        _context.GoodsPrices.Add(entity);
    }
    private void AddGWholesalePrice(Guid GoodsId, IEnumerable<UpdateMyGoodsWholesalePrice> request)
    {
        foreach(var j in request)
        {
            var entity = new GoodsWholesalePrice
            {
                GoodsId = GoodsId,
                End = null,
                Start = this._tanggal.Now,
                WholesalerPrice = j.WholesalerPrice,
                WholesalerMin = j.WholesalerMin,
            };
            _context.GoodsWholesalePrices.Add(entity);
        }
        
    }
}
