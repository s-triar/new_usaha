using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using new_usaha.Application.Common.Interfaces;

namespace new_usaha.Application.CQRS.EnterpriseClaims.Queries;

public class CheckDuplicateRoleNameQuery : IRequest<bool>
{
    public string? Name { get; set; }

}
public class CheckDuplicateRoleNameQueryHandler : IRequestHandler<CheckDuplicateRoleNameQuery, bool>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentEnterpriseService currentEnterprise;

    public CheckDuplicateRoleNameQueryHandler(IApplicationDbContext context, ICurrentEnterpriseService currentEnterprise)
    {
        _context = context;
        this.currentEnterprise = currentEnterprise;
    }
    public async Task<bool> Handle(CheckDuplicateRoleNameQuery request, CancellationToken cancellationToken)
    {
        var entity = await _context.EnterpriseRoles
                                .Where(x => x.EnterpriseId.ToString() == this.currentEnterprise.EnterpriseId)
                                .Where(x => x.Name.ToLower() == request.Name!.Trim().ToLower())
                                .SingleOrDefaultAsync(cancellationToken);
        return entity != null;
    }
}
