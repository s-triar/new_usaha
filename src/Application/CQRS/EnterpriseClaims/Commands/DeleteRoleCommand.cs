using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using new_usaha.Application.Common.Interfaces;

namespace new_usaha.Application.CQRS.EnterpriseClaims.Commands;

public class DeleteRoleCommand : IRequest<Guid>
{
    public Guid Id { get; set; }
}
public class DeleteRoleCommandValidator : AbstractValidator<DeleteRoleCommand>
{
    private readonly IApplicationDbContext context;
    private readonly ICurrentEnterpriseService currentEnterprise;

    public DeleteRoleCommandValidator(IApplicationDbContext context, ICurrentEnterpriseService currentEnterprise)
    {
        this.context = context;
        this.currentEnterprise = currentEnterprise;

        RuleFor(k => k.Id)
            .Must((model, id, cancelToken) => (this.context.EnterpriseRoles.Any(x => x.EnterpriseId.ToString() == this.currentEnterprise.EnterpriseId && id == x.Id)))
            .WithMessage("Id tidak diketahui.");

    }
}
public class DeleteRoleCommandHandler : IRequestHandler<DeleteRoleCommand, Guid>
{
    private readonly IApplicationDbContext context;
    private readonly ICurrentUserService userService;
    private readonly ICurrentEnterpriseService currentEnterprise;

    public DeleteRoleCommandHandler(IApplicationDbContext context, ICurrentUserService userService, ICurrentEnterpriseService currentEnterprise)
    {
        this.context = context;
        this.userService = userService;
        this.currentEnterprise = currentEnterprise;
    }

    public async Task<Guid> Handle(DeleteRoleCommand request, CancellationToken cancellationToken)
    {
        //throw new NotImplementedException();
        var enterpriseRole = await this.context.EnterpriseRoles
                                               .Include(x => x.EnterpriseRoleClaims).ThenInclude(x => x.EnterpriseClaim)
                                               .FirstOrDefaultAsync(x => x.Id == request.Id);
        this.context.EnterpriseRoleClaims.RemoveRange(enterpriseRole!.EnterpriseRoleClaims);
        this.context.EnterpriseRoles.Remove(enterpriseRole);
        await this.context.SaveChangesAsync(cancellationToken);
        return enterpriseRole.Id;
    }
}
