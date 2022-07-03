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

public class GetDetailEnterpriseEmployeeQuery : IRequest<EnterpriseEmployeeDetailDto>
{
    public Guid Id { get; set; } 

}
public class GetDetailEnterpriseEmployeeQueryHandler : IRequestHandler<GetDetailEnterpriseEmployeeQuery, EnterpriseEmployeeDetailDto>
{
    private readonly IApplicationDbContext _context;
    private readonly IIdentityService identityService;
    private readonly ICurrentEnterpriseService currentEnterprise;

    public GetDetailEnterpriseEmployeeQueryHandler(IApplicationDbContext context, IIdentityService identityService, ICurrentEnterpriseService currentEnterprise)
    {
        _context = context;
        this.identityService = identityService;
        this.currentEnterprise = currentEnterprise;
    }

    public async Task<EnterpriseEmployeeDetailDto> Handle(GetDetailEnterpriseEmployeeQuery request, CancellationToken cancellationToken)
    {
        
        var entity = await _context.EnterpriseEmployees
                                          .Include(x => x.EnterpriseRole)
                                          .Where(x => x.Id == request.Id && x.EnterpriseId.ToString() == this.currentEnterprise.EnterpriseId)
                                          .SingleOrDefaultAsync(cancellationToken);
        var user = await this.identityService.GetMinimalInfoUserByIdAsync(entity.UserId);
        return new EnterpriseEmployeeDetailDto
        {
            Email = user.Email!,
            UserId = user.Id!,
            EmployeeId = entity!.Id.ToString(),
            Name = user.Name!,
            EnterpriseRoleName = entity.EnterpriseRole.Name
        };
    }
}
