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
using new_usaha.Application.CQRS.Goodses.Commands.CreateGoods;
using new_usaha.Domain.Entities;

namespace new_usaha.Application.CQRS.Goodses.Commands.UpdateGoods;

public class UpdateGoodsCommand : IRequest<Guid>
{
    public Guid Id { get; set; }
    public string Barcode { get; set; }  //PENDING TODO Update Barcode
    public string Name { get; set; } 
    public string? Description { get; set; }
    public int GoodsTypeId { get; set; }
    public string? Photo { get; set; }
    public IFormFile? PhotoFile { get; set; }
    public int Contain { get; set; } // smaller goods if the goods is the smallest, then this should be 1
    public int AvailableOnline { get; set; }
    public string? ParentBarcode { get; set; }
    public List<string> AddGoodsGroups { get; set; } 
    public List<string> RemoveGoodsGroups { get; set; } 
}
public class UpdateGoodsCommandValidator : GoodsValidator<UpdateGoodsCommand>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentEnterpriseService _currentEnterprise;

    public UpdateGoodsCommandValidator(IApplicationDbContext context, ICurrentEnterpriseService currentEnterprise):base(context,currentEnterprise)
    {
        _context = context;
        _currentEnterprise = currentEnterprise;

        RuleFor(v => v.Id)
            .NotEmpty().WithMessage("Id produk harus diisi.")
            .MustAsync(CheckId).WithMessage("Id produk tidak ditemukan");

        RuleFor(v => v.Name)
            .NotEmpty().WithMessage("Nama produk harus diisi.")
            .MaximumLength(255).WithMessage("Nama produk tidak melebihi 255 karakter");

        RuleFor(v => v.ParentBarcode)
          .MustAsync((model, ParentBarcode, cancelToken) => { return this.BeExistParentBarcode(ParentBarcode, model.Barcode, cancelToken); })
          .WithMessage("Parent Barcode tidak ada.");

        RuleFor(v => v.AddGoodsGroups)
           .MustAsync((model, GoodsGroups, cancelToken) => { return this.BeExistGroup(GoodsGroups, cancelToken); })
           .WithMessage("Terdapat group yang tidak ada (Tambah).");

        RuleFor(v => v.RemoveGoodsGroups)
          .MustAsync((model, GoodsGroups, cancelToken) => { return this.BeExistGroup(GoodsGroups, cancelToken); })
          .WithMessage("Terdapat group yang tidak ada (Hapus).");
    }
}
public class UpdateGoodsCommandHandler : AlterGoodsCommand, IRequestHandler<UpdateGoodsCommand, Guid>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentEnterpriseService _ce;
    public UpdateGoodsCommandHandler(IApplicationDbContext context, ICurrentEnterpriseService ce): base(context)
    {
        _context = context;
        _ce = ce;
    }
    public async Task<Guid> Handle(UpdateGoodsCommand request, CancellationToken cancellationToken)
    {
        var goods = await this._context.Goodses
                                       .Include(x => x.GoodsPhotos)
                                       .Include(x => x.GoodsStock)
                                       .FirstOrDefaultAsync(x => x.Id == request.Id);
        goods.ParentGoodsId = string.IsNullOrEmpty(request.ParentBarcode) ? null : this._context.Goodses.FirstOrDefault(x => x.EnterpriseId.ToString() == this._ce.EnterpriseId && x.Barcode == request.Barcode).Id;
        goods.Name = request.Name;
        goods.GoodsTypeId = request.GoodsTypeId;
        goods.Description = request.Description;
        goods.Contain = request.Contain;
        goods.AvailableOnline = request.AvailableOnline == 1;
        if (goods.GoodsPhotos.Count() > 0 && goods.GoodsPhotos.LastOrDefault().Url != request.Photo && request.Photo != null)
        {
            await this.AddGoodsPhoto(goods.Id,request.PhotoFile,request.Photo, cancellationToken);
        }
        this._context.Goodses.Update(goods);
        await _context.SaveChangesAsync(cancellationToken);
        await this.AlterGoodsGroup(goods.Id, request.AddGoodsGroups, request.RemoveGoodsGroups, cancellationToken);
        return goods.Id;
    }
}
