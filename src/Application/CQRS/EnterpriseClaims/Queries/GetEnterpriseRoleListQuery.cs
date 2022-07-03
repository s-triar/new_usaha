using AutoMapper;
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

public class GetEnterpriseRoleListQuery : IRequest<IEnumerable<EnterpriseRoleDto>>
{
    public string? Search { get; set; }
}
public class GetEnterpriseRoleListQueryHandler : IRequestHandler<GetEnterpriseRoleListQuery, IEnumerable<EnterpriseRoleDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly ICurrentEnterpriseService currentEnterprise;

    public GetEnterpriseRoleListQueryHandler(IApplicationDbContext context, IMapper mapper, ICurrentEnterpriseService currentEnterprise)
    {
        _context = context;
        _mapper = mapper;
        this.currentEnterprise = currentEnterprise;
    }
    public async Task<IEnumerable<EnterpriseRoleDto>> Handle(GetEnterpriseRoleListQuery request, CancellationToken cancellationToken)
    {
        request.Search = request.Search == null ? "" : request.Search.Trim().ToLower();
        var entities = await _context.EnterpriseRoles
                                       .OrderBy(x => x.Name)
                                       .Where(x => x.EnterpriseId.ToString() == this.currentEnterprise.EnterpriseId)
                                       .Where(x => x.Name.ToLower().Contains(request.Search))
                                       .ToListAsync(cancellationToken);
        return entities.Select(_mapper.Map<EnterpriseRoleDto>);

    }
}
