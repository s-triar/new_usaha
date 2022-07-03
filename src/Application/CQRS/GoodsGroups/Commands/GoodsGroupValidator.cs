using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using new_usaha.Application.Common.Interfaces;

namespace new_usaha.Application.CQRS.GoodsGroups.Commands;

public class GoodsGroupValidator<T>: AbstractValidator<T>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentEnterpriseService _currentEnterprise;

    public GoodsGroupValidator(IApplicationDbContext context, ICurrentEnterpriseService currentEnterprise)
    {
        _context = context;
        _currentEnterprise = currentEnterprise;
    }
    public async Task<bool> BeExistName(string Name, CancellationToken cancellationToken)
    {
        return !(await _context.GoodsGroups
            .AnyAsync(l => l.EnterpriseId.ToString() == this._currentEnterprise.EnterpriseId && Name == l.Name));
    }
}
