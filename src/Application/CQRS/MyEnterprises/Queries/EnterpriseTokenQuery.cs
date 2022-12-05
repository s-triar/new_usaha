using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using new_usaha.Application.Common.Interfaces;
using new_usaha.Application.Common.Models;
using Microsoft.EntityFrameworkCore;
using new_usaha.Application.Common.Exceptions;

namespace new_usaha.Application.CQRS.MyEnterprises.Queries;

public static class EnteerpriseClaimType
{
    public static readonly string UserId = "UserId";
    public static readonly string EnterpriseId = "EnterpriseId";
    public static readonly string RoleId = "RoleId";
}
public static class EnteerpriseClaimValueDefault
{
    public static readonly string RoleOwner = "owner";
}
public class EnterpriseTokenModel
{
    public string UserId { get; set; }
    public string EnterpriseId { get; set; }
    public string RoleId { get; set; }
}
public class EnterpriseTokenDto
{
    public string Token { get; set; }
}
public class EnterpriseTokenQuery : EnterpriseRequest, IRequest<EnterpriseTokenModel>
{
}
public class EnterpriseTokenQueryHandler : IRequestHandler<EnterpriseTokenQuery, EnterpriseTokenModel>
{
    private readonly IApplicationDbContext context;
    private readonly ICurrentUserService currentUser;

    public EnterpriseTokenQueryHandler(IApplicationDbContext context, ICurrentUserService currentUser)
    {
        this.context = context;
        this.currentUser = currentUser;
    }
    public async Task<EnterpriseTokenModel> Handle(EnterpriseTokenQuery request, CancellationToken cancellationToken)
    {

        var enterprise = await context.Enterprises.FindAsync(request.EnterpriseId);
        if (enterprise!.UserOwnerId == currentUser.UserId)
        {
            return new EnterpriseTokenModel
            {
                EnterpriseId = request.EnterpriseId.ToString(),
                RoleId = EnteerpriseClaimValueDefault.RoleOwner,
                UserId = currentUser.UserId
            };
        }
        else
        {
            var enterpriseEmployee = await context.EnterpriseEmployees
                                            .Include(x => x.EnterpriseRole)
                                            .Where(x => x.EnterpriseId == request.EnterpriseId)
                                            .Where(x => x.UserId == currentUser.UserId)
                                            .FirstOrDefaultAsync();

            if (enterpriseEmployee == null)
            {
                throw new NotFoundException("Anda bukan pegawai di usaha ini.");
            }
            // TODO check the employee's schedule

            return new EnterpriseTokenModel
            {
                EnterpriseId = request.EnterpriseId.ToString(),
                RoleId = enterpriseEmployee.EnterpriseRoleId.ToString(),
                UserId = currentUser.UserId
            };
        }
    }
}
