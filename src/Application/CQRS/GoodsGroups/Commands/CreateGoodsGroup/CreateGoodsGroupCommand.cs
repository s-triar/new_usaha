using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;
using MediatR;
using new_usaha.Application.Common.Interfaces;
using new_usaha.Domain.Entities;

namespace new_usaha.Application.CQRS.GoodsGroups.Commands.CreateGoodsGroup;

public class CreateGoodsGroupCommand: IRequest<Guid>
{
    public string Name { get; set; } 
    public string? Description { get; set; }

}
public class CreateGoodsGroupCommandValidator : GoodsGroupValidator<CreateGoodsGroupCommand>
{
    public CreateGoodsGroupCommandValidator(IApplicationDbContext context, ICurrentEnterpriseService currentEnterprise) : base(context, currentEnterprise)
    {
        RuleFor(v => v.Name)
            .NotEmpty().WithMessage("Nama group produk harus diisi.")
            .MaximumLength(255).WithMessage("Nama grup produk tidak melebihi 255 karakter");
        RuleFor(v => v.Name)
            .MustAsync((model, name, cancelToken) => { return this.BeExistName(name, cancelToken); })
            .WithMessage("Nama group produk sudah ada.");
    }
}

public class CreateGoodsGroupCommandHandler : IRequestHandler<CreateGoodsGroupCommand, Guid>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentEnterpriseService _ce;

    public CreateGoodsGroupCommandHandler(IApplicationDbContext context, ICurrentEnterpriseService ce) 
    {
        _context = context;
        _ce = ce;
    }
    public async Task<Guid> Handle(CreateGoodsGroupCommand request, CancellationToken cancellationToken)
    {
        var entity = new GoodsGroup
        {
            Name = request.Name,
            EnterpriseId = Guid.Parse(this._ce.EnterpriseId),
            Description = request.Description,
        };
        this._context.GoodsGroups.Add(entity);
        await _context.SaveChangesAsync(cancellationToken);
        return entity.Id;
    }
}