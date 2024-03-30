using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using new_usaha.Application.Common.Interfaces;

namespace new_usaha.Application.CQRS.MyGoodsContainers;
public class GoodsContainerValidator<T> : AbstractValidator<T>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentEnterpriseService _currentEnterprise;

    public GoodsContainerValidator(IApplicationDbContext context, ICurrentEnterpriseService currentEnterprise)
    {
        _context = context;
        _currentEnterprise = currentEnterprise;
    }

    public async Task<bool> checkEnterprise(Guid Id, CancellationToken cancellationToken)
    {
        return await _context.GoodsContainers
            .AnyAsync(l => l.Id == Id && l.EnterpriseId.ToString() == _currentEnterprise.EnterpriseId);
    }
    public async Task<bool> BeExistGoodsType(int GoodsTypeId, CancellationToken cancellationToken)
    {
        return await _context.GoodsTypes
            .AnyAsync(l => l.Id == GoodsTypeId);
    }
}
