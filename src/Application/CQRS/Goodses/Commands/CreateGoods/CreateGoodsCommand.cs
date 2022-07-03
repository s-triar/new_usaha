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
using new_usaha.Application.CQRS.Goodses.Commands;
using new_usaha.Domain.Entities;

namespace new_usaha.Application.CQRS.Goodses.Commands.CreateGoods;

public class CreateGoodsCommand : IRequest<Guid>
{
    public string Name { get; set; } 
    public string? Description { get; set; }
    public int GoodsTypeId { get; set; }
    public string Barcode { get; set; } 
    public string? Photo { get; set; }
    public string? PhotoString { get; set; }
    public IFormFile? PhotoFile { get; set; }
    public int Contain { get; set; } // smaller goods if the goods is the smallest, then this should be 1
    public int AvailableOnline { get; set; }
    public string? ParentBarcode { get; set; }
    public List<string>? GoodsGroups { get; set; }


    public decimal Price { get; set; }
    public decimal BuyPrice { get; set; }
    public decimal WholesalerPrice { get; set; }
    public int WholesalerMin { get; set; }
    public int IsWholesalerPriceAuto { get; set; }

    public int N { get; set; }
    public int Threshold { get; set; } // threshold stock
}
public class CreateGoodsCommandValidator : GoodsValidator<CreateGoodsCommand>
{

    public CreateGoodsCommandValidator(IApplicationDbContext context, ICurrentEnterpriseService currentEnterprise):base(context,currentEnterprise)
    {

        RuleFor(v => v.Name)
            .NotEmpty().WithMessage("Nama produk harus diisi.")
            .MaximumLength(255).WithMessage("Nama produk tidak melebihi 255 karakter");

        RuleFor(v => v.GoodsTypeId)
            .NotEmpty().WithMessage("Kategori produk harus diisi.")
            .MustAsync(BeExistGoodsType).WithMessage("Kategori produk tidak ditemukan");


        RuleFor(v => v.Barcode)
            .MustAsync((model, barcode, cancelToken) => { return this.BeExistBarcode(barcode, cancelToken); })
            .WithMessage("Produk tidak ada barcodenya.");

        RuleFor(v => v.Barcode)
            .MustAsync((model, barcode, cancelToken) => { return this.BeUniqueBarcode(barcode, cancelToken); })
            .WithMessage("Barcode sudah dipakai.");

        RuleFor(v => v.ParentBarcode)
           .MustAsync((model, ParentBarcode, cancelToken) => { return this.BeExistParentBarcode(ParentBarcode, model.Barcode, cancelToken); })
           .WithMessage("Parent Barcode tidak ada.");

        RuleFor(v => v.GoodsGroups)
           .MustAsync((model, GoodsGroups, cancelToken) => { return this.BeExistGroup(GoodsGroups, cancelToken); })
           .WithMessage("Terdapat group yang tidak ada.");
        RuleFor(v => v.GoodsGroups)
           .MustAsync((model, GoodsGroups, cancelToken) => { return this.BeExistGroup(GoodsGroups, cancelToken); })
           .WithMessage("Terdapat group yang tidak ada.");
        RuleFor(v => v.PhotoFile)
           .Must((model, PhotoFile) => { return this.FileMustBeImage(PhotoFile?.ContentType); })
           .WithMessage("Gambar harus berformat .jpg, .jpeg, atau .png");
        RuleFor(v => v.PhotoFile)
           .Must((model, PhotoFile) => { return this.FileMaxSize(PhotoFile?.Length); })
           .WithMessage("Ukuran maksimal gambar 250");
    }
    
}
public class CreateGoodsCommandHandler : AlterGoodsCommand, IRequestHandler<CreateGoodsCommand, Guid>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserService _cs;
    private readonly ICurrentEnterpriseService _ce;

    public CreateGoodsCommandHandler(IApplicationDbContext context, ICurrentUserService cs, ICurrentEnterpriseService ce):base(context)
    {
        _context = context;
        _cs = cs;
        _ce = ce;
    }
    public async Task<Guid> Handle(CreateGoodsCommand request, CancellationToken cancellationToken)
    {
        var goods = await this.AddGoods(request, cancellationToken);
        var goodsPrice = await this.AddGoodsPrice(goods.Id, request.Price, request.WholesalerPrice, request.IsWholesalerPriceAuto == 1, request.WholesalerMin, cancellationToken);
        var goodsStock = await this.AddGoodsStocks(goods.Id, request.N, request.Threshold, cancellationToken);
        var goodsStockHistory = await this.AddStockHistory(goodsStock.Id, request.N, request.BuyPrice, cancellationToken);
        if(request.GoodsGroups!=null && request.GoodsGroups.Count()>0)
            await this.AlterGoodsGroup(goods.Id, request.GoodsGroups, new List<string>(), cancellationToken);
        await this.AddGoodsPhoto(goods.Id, request.PhotoFile, null, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
        return goods.Id;
    }

    private async Task<Goods> AddGoods(CreateGoodsCommand request, CancellationToken cancellationToken)
    {
        var entity = new Goods
        {
            AvailableOnline = request.AvailableOnline == 1,
            Barcode = request.Barcode,
            Contain = request.Contain,
            Description = request.Description,
            Name = request.Name,
            GoodsTypeId=request.GoodsTypeId,
            EnterpriseId = Guid.Parse(this._ce.EnterpriseId),
            ParentGoodsId = string.IsNullOrEmpty(request.ParentBarcode) ? null : this._context.Goodses.FirstOrDefault(x=>x.EnterpriseId.ToString() == this._ce.EnterpriseId && x.Barcode == request.Barcode).Id
        };
        _context.Goodses.Add(entity);
        await _context.SaveChangesAsync(cancellationToken);
        return entity;
    }
}
