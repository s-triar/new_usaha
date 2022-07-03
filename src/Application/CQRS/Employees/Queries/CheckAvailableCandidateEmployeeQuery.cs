using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using new_usaha.Application.Common.Interfaces;

namespace new_usaha.Application.CQRS.Employees.Queries;

public class CheckAvailableCandidateEmployeeQuery : IRequest<bool>
{
    public string Email { get; set; } 
}
public class CheckAvailableCandidateEmployeeQueryHandler : IRequestHandler<CheckAvailableCandidateEmployeeQuery, bool>
{
    private readonly IApplicationDbContext _context;
    private readonly IIdentityService identityService;
    private readonly ICurrentEnterpriseService currentEnterprise;

    public CheckAvailableCandidateEmployeeQueryHandler(IApplicationDbContext context, IIdentityService identityService, ICurrentEnterpriseService currentEnterprise)
    {
        _context = context;
        this.identityService = identityService;
        this.currentEnterprise = currentEnterprise;
    }
    public async Task<bool> Handle(CheckAvailableCandidateEmployeeQuery request, CancellationToken cancellationToken)
    {
        var user = await this.identityService.GetMinimalInfoUserByEmailAsync(request.Email);
        if(user == null)
        {
            return true;
        }
        if (string.IsNullOrEmpty(user.Id))
        {
            return true;
        }
        if (user.Id == this.currentEnterprise.UserId)
        {
            return true;
        }
        var entity = await _context.EnterpriseEmployees
                                          .Where(x => x.UserId == user.Id && x.EnterpriseId.ToString() == this.currentEnterprise.EnterpriseId)
                                          //.Where(x => x.Barcode.ToLower() == request.Barcode.Trim().ToLower())
                                          .SingleOrDefaultAsync(cancellationToken);
        return entity != null;
    }
}
