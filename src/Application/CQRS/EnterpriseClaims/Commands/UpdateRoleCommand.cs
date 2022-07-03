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
using new_usaha.Domain.Entities;

namespace new_usaha.Application.CQRS.EnterpriseClaims.Commands;

public class UpdateRoleCommand : IRequest<Guid>
{
    public Guid Id { get; set; }
    public string Name { get; set; } 
    public IEnumerable<RoleClaimItem> Claims { get; set; } 
}
public class UpdateRoleCommandValidator : AbstractValidator<UpdateRoleCommand>
{
    private readonly IApplicationDbContext context;
    private readonly ICurrentEnterpriseService currentEnterprise;

    public UpdateRoleCommandValidator(IApplicationDbContext context, ICurrentEnterpriseService currentEnterprise)
    {
        this.context = context;
        this.currentEnterprise = currentEnterprise;

        RuleFor(k => k.Id)
            .NotEmpty().WithMessage("Id peran harus diisi.")
            .Must((model, id, cancelToken) => this.context.EnterpriseRoles.Any(x => x.EnterpriseId.ToString() == this.currentEnterprise.EnterpriseId && x.Id == id))
            .WithMessage("Id tidak dikenal.");
        RuleFor(k => k.Name)
            .NotEmpty().WithMessage("Nama peran harus diisi.")
            .MaximumLength(255).WithMessage("Nama peran tidak melebihi 255 karakter")
            .Must((model, name, cancelToken) => !(this.context.EnterpriseRoles.Any(x => x.Id != model.Id && x.EnterpriseId.ToString() == this.currentEnterprise.EnterpriseId && name.Trim().ToLower() == x.Name.ToLower())))
            .WithMessage("Nama peran sudah dipakai.");

    }
}
public class UpdateRoleCommandHandler : IRequestHandler<UpdateRoleCommand, Guid>
{
    private readonly IApplicationDbContext context;
    private readonly ICurrentUserService userService;
    private readonly ICurrentEnterpriseService currentEnterprise;

    public UpdateRoleCommandHandler(IApplicationDbContext context, ICurrentUserService userService, ICurrentEnterpriseService currentEnterprise)
    {
        this.context = context;
        this.userService = userService;
        this.currentEnterprise = currentEnterprise;
    }

    public async Task<Guid> Handle(UpdateRoleCommand request, CancellationToken cancellationToken)
    {
        //throw new NotImplementedException();
        var enterpriseRole = await this.context.EnterpriseRoles
                                               .Include(x => x.EnterpriseRoleClaims).ThenInclude(x => x.EnterpriseClaim)
                                               .FirstOrDefaultAsync(x => x.Id == request.Id);
        var claims = request.Claims.Where(x => x.Authorize == 1).Select(x => x.Id);
        var claimExisited = enterpriseRole!.EnterpriseRoleClaims.Select(x => x.EnterpriseClaimId);
        var claimRemoved = claimExisited.Where(x => !claims.Contains(x)).ToList();
        var claimAdded = claims.Where(x => !claimExisited.Contains(x)).ToList();

        //Remove claim
        var listClaimRmoved = await this.context.EnterpriseRoleClaims.Where(x => claimRemoved.Contains(x.EnterpriseClaimId)).ToListAsync(cancellationToken);
        this.context.EnterpriseRoleClaims.RemoveRange(listClaimRmoved);

        //Add claim
        foreach (var c in claimAdded)
        {
            var cl = new EnterpriseRoleClaim
            {
                EnterpriseClaimId = c,
                EnterpriseRoleId = enterpriseRole.Id
            };
            this.context.EnterpriseRoleClaims.Add(cl);
            enterpriseRole.EnterpriseRoleClaims.Add(cl);
        }

        enterpriseRole.Name = request.Name.Trim();
        this.context.EnterpriseRoles.Update(enterpriseRole);
        await this.context.SaveChangesAsync(cancellationToken);
        return enterpriseRole.Id;
    }


}
