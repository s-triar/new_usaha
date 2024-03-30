using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;
using MediatR;
using new_usaha.Application.Common.Interfaces;
using new_usaha.Domain.Entities;

namespace new_usaha.Application.CQRS.MyGoodsContainers.Commands;
public class CreateMyGoodsContainerCommand : IRequest<Unit>
{
    public string Name { get; set; }
    public string? Description { get; set; }
    public Guid EnterpriseId { get; set; }
    public int GoodsTypeId { get; set; }
}

public class CreateMyGoodsContainerCommandValidator : GoodsContainerValidator<CreateMyGoodsContainerCommand>
{

    public CreateMyGoodsContainerCommandValidator(IApplicationDbContext context, ICurrentEnterpriseService currentEnterprise): base(context, currentEnterprise)    
    {
        RuleFor(v => v.GoodsTypeId)
            .NotEmpty().WithMessage("Kategori produk harus diisi.")
            .MustAsync(BeExistGoodsType).WithMessage("Kategori produk tidak ditemukan");
    }
}


public class CreateMyGoodsContainerCommandHandler : IRequestHandler<CreateMyGoodsContainerCommand, Unit>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserService _cs;
    private readonly ICurrentEnterpriseService _ce;
    public CreateMyGoodsContainerCommandHandler(IApplicationDbContext context, ICurrentUserService cs, ICurrentEnterpriseService ce)
    {
        _context = context;
        _cs = cs;
        _ce = ce;   
    }

    public async Task<Unit> Handle(CreateMyGoodsContainerCommand request, CancellationToken cancellationToken)
    {
        await _context.BeginTransactionAsync();

        var entity = new GoodsContainer
        {
            Description = request.Description,
            Name = request.Name,
            EnterpriseId = Guid.Parse(_ce.EnterpriseId),
            GoodsTypeId = request.GoodsTypeId,
        };

        _context.GoodsContainers.Add(entity);

        await _context.SaveChangesAsync(cancellationToken);

        await _context.CommitTransactionAsync();

        return Unit.Value;
    }
}