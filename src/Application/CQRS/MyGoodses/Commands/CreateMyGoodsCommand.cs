using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using new_usaha.Application.Common.Constants;
using new_usaha.Application.Common.Interfaces;
using new_usaha.Domain.Entities;
using new_usaha.Application.Common.Models;

namespace new_usaha.Application.CQRS.MyGoodses.Commands;



public class CreateMyGoodsCommand : IRequest<Unit>
{
    public Guid GoodsContainerId { get; set; }
    public string Name { get; set; }
    public string Barcode { get; set; }
    public string? Photo { get; set; }
    public string? PhotoString { get; set; }
    public IFormFile? PhotoFile { get; set; }
    public int Contain { get; set; } // smaller goods if the goods is the smallest, then this should be 1
    public int AvailableOnline { get; set; }
    public string? ParentBarcode { get; set; }
    public List<string>? GoodsGroups { get; set; }
    public List<WholesalesPrice> WholesalesPrices { get; set; }
    public decimal Price { get; set; }
    public decimal BuyPrice { get; set; }
    public int IsWholesalerPriceAuto { get; set; }
    public int N { get; set; }
    public int Threshold { get; set; } // threshold stock
}
public class CreateMyGoodsCommandValidator : GoodsValidator<CreateMyGoodsCommand>
{

    public CreateMyGoodsCommandValidator(IApplicationDbContext context, ICurrentEnterpriseService currentEnterprise) : base(context, currentEnterprise)
    {

        RuleFor(v => v.Name)
            .NotEmpty().WithMessage("Nama produk harus diisi.")
            .MaximumLength(255).WithMessage("Nama produk tidak melebihi 255 karakter");

        RuleFor(v => v.Barcode)
            .MustAsync((model, barcode, cancelToken) => { return BeExistBarcode(barcode, cancelToken); })
            .WithMessage("Produk tidak ada barcodenya.");

        RuleFor(v => v.Barcode)
            .MustAsync((model, barcode, cancelToken) => { return BeUniqueBarcode(barcode, cancelToken); })
            .WithMessage("Barcode sudah dipakai.");

        RuleFor(v => v.ParentBarcode)
           .MustAsync((model, ParentBarcode, cancelToken) => { return BeExistParentBarcode(ParentBarcode, model.Barcode, cancelToken); })
           .WithMessage("Parent Barcode tidak ada.");

        RuleFor(v => v.GoodsGroups)
           .MustAsync((model, GoodsGroups, cancelToken) => { return BeExistGroup(GoodsGroups, cancelToken); })
           .WithMessage("Group tidak ada.");

        RuleFor(v => v.PhotoFile)
           .Must((model, PhotoFile) => { return FileMustBeImage(PhotoFile?.ContentType); })
           .WithMessage("Gambar harus berformat .jpg, .jpeg, atau .png");
        RuleFor(v => v.PhotoFile)
           .Must((model, PhotoFile) => { return FileMaxSize(PhotoFile?.Length); })
           .WithMessage("Ukuran maksimal gambar 250");
    }

}
public class CreateMyGoodsCommandHandler : AlterGoodsCommand, IRequestHandler<CreateMyGoodsCommand, Unit>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserService _cs;
    private readonly ICurrentEnterpriseService _ce;

    public CreateMyGoodsCommandHandler(IApplicationDbContext context, ICurrentUserService cs, ICurrentEnterpriseService ce, IDateTime tanggal) : base(context, tanggal)
    {
        _context = context;
        _cs = cs;
        _ce = ce;
    }
    public async Task<Unit> Handle(CreateMyGoodsCommand request, CancellationToken cancellationToken)
    {
        await this._context.BeginTransactionAsync();
        //try
        //{
            var goods = await AddGoods(request, cancellationToken);
            var goodsPrice = await AddGoodsPrice(goods.Id, request.Price, cancellationToken);
            var goodsWholesalePrices = await AddGoodsWholesalePrices(goods.Id, request.WholesalesPrices, cancellationToken);
            var goodsStock = await AddGoodsStocks(goods.Id, request.N, request.Threshold, cancellationToken);
            var goodsStockHistory = await AddStockHistory(goodsStock.Id, request.N, request.BuyPrice, cancellationToken);
            if (request.GoodsGroups != null && request.GoodsGroups.Count() > 0)
                await AlterGoodsGroup(goods.Id, request.GoodsGroups, new List<string>(), cancellationToken);
            await AddGoodsPhoto(goods.Id, request.PhotoFile, null, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);
            await this._context.CommitTransactionAsync();
        //return new ResultWithMessage(true, new List<string>() { }, "Berhasil menambah produk");
        return Unit.Value;
        //}
        //catch(Exception ex)
        //{
        //    this._context.RollbackTransaction();
        //    return new ResultWithMessage(false, new List<string>() {ex.Message }, "Gagal menambah produk");

        //}

    }

    private async Task<Goods> AddGoods(CreateMyGoodsCommand request, CancellationToken cancellationToken)
    {
        var entity = new Goods
        {
            AvailableOnline = request.AvailableOnline == 1,
            Barcode = request.Barcode,
            Contain = request.Contain,
            Name = request.Name,
            IsWholesalerPriceAuto = request.IsWholesalerPriceAuto == 1,
            GoodsContainerId = request.GoodsContainerId,
            ParentGoodsId = string.IsNullOrEmpty(request.ParentBarcode) ? null : this._context.Goodses.FirstOrDefault(x => x.GoodsContainer.EnterpriseId.ToString() == this._ce.EnterpriseId && x.Barcode == request.Barcode).Id
        };
        _context.Goodses.Add(entity);
        await _context.SaveChangesAsync(cancellationToken);
        return entity;
    }
}
