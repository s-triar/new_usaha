using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using new_usaha.Application.Common.Interfaces;

namespace new_usaha.Application.CQRS.Employees.Queries;

public class GetCandidateEmployeeQuery: IRequest<UserMinimalInfo>
{
    public string CandidateEmployeeEmail { get; set; }
}

public class GetCandidateEmployeeQueryHandler : IRequestHandler<GetCandidateEmployeeQuery, UserMinimalInfo>
{
    private readonly IApplicationDbContext _context;
    private readonly IIdentityService _cs;
    private readonly ICurrentEnterpriseService _ce;
    public GetCandidateEmployeeQueryHandler(
        IApplicationDbContext context,
        IIdentityService cs,
        ICurrentEnterpriseService ce
        )
    {
        _context = context;
        _cs = cs;
        _ce = ce;
    }

    public async Task<UserMinimalInfo> Handle(GetCandidateEmployeeQuery request, CancellationToken cancellationToken)
    {
        var user = await _cs.GetMinimalInfoUserByEmailAsync(request.CandidateEmployeeEmail);

        return user;
    }
}