using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using new_usaha.Application.Common.Interfaces;

namespace new_usaha.Application.CQRS.GoodsGroups.Queries.CheckDuplicateGoodsGroupName;

public class CheckDuplicateGoodsGroupNameQuery: IRequest<bool>
{
    public string Name { get; set; } 
}

public class CheckDuplicateGoodsGroupNameQueryHandler : IRequestHandler<CheckDuplicateGoodsGroupNameQuery, bool>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentEnterpriseService _currentEnterprise;

    public CheckDuplicateGoodsGroupNameQueryHandler(IApplicationDbContext context, ICurrentEnterpriseService currentEnterprise)
    {
        _context = context;
        _currentEnterprise = currentEnterprise;
    }
    public async Task<bool> Handle(CheckDuplicateGoodsGroupNameQuery request, CancellationToken cancellationToken)
    {
        var entity = await _context.GoodsGroups
                                .Where(x => x.EnterpriseId.ToString() == this._currentEnterprise.EnterpriseId)
                                .Where(x => x.Name.ToLower() == request.Name.Trim().ToLower())
                                .SingleOrDefaultAsync(cancellationToken);
        return entity != null;
    }
}
