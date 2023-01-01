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

public class RoleClaimItem
{
    public Guid Id { get; set; }
    public int Authorize { get; set; }
}
public class CreateRoleCommand : IRequest<Unit>
{
    public string Name { get; set; } 
    public IEnumerable<RoleClaimItem> Claims { get; set; } 
}
public class CreateRoleCommandValidator : AbstractValidator<CreateRoleCommand>
{
    private readonly IApplicationDbContext context;
    private readonly ICurrentEnterpriseService currentEnterprise;

    public CreateRoleCommandValidator(IApplicationDbContext context, ICurrentEnterpriseService currentEnterprise)
    {
        this.context = context;
        this.currentEnterprise = currentEnterprise;

        RuleFor(k => k.Name)
            .NotEmpty().WithMessage("Nama peran harus diisi.")
            .MaximumLength(255).WithMessage("Nama peran tidak melebihi 255 karakter")
            .Must((model, name, cancelToken) => !(this.context.EnterpriseRoles.Any(x => x.EnterpriseId.ToString() == this.currentEnterprise.EnterpriseId && name.Trim().ToLower() == x.Name.ToLower())))
            .WithMessage("Nama peran sudah dipakai.");

    }
}
public class CreateRoleCommandHandler : IRequestHandler<CreateRoleCommand, Unit>
{
    private readonly IApplicationDbContext context;
    private readonly ICurrentUserService userService;
    private readonly ICurrentEnterpriseService currentEnterprise;

    public CreateRoleCommandHandler(IApplicationDbContext context, ICurrentUserService userService, ICurrentEnterpriseService currentEnterprise)
    {
        this.context = context;
        this.userService = userService;
        this.currentEnterprise = currentEnterprise;
    }

    public async Task<Unit> Handle(CreateRoleCommand request, CancellationToken cancellationToken)
    {
        //throw new NotImplementedException();
        var claims = request.Claims.Where(x => x.Authorize == 1).Select(x => x.Id);
        var enterpriseRole = new EnterpriseRole
        {
            Name = request.Name.Trim(),
            EnterpriseId = Guid.Parse(this.currentEnterprise.EnterpriseId)
        };
        this.context.EnterpriseRoles.Add(enterpriseRole);
        foreach (var c in claims)
        {
            var cl = new EnterpriseRoleClaim
            {
                EnterpriseClaimId = c,
                EnterpriseRoleId = enterpriseRole.Id
            };
            this.context.EnterpriseRoleClaims.Add(cl);
            enterpriseRole.EnterpriseRoleClaims.Add(cl);
        }
        await this.context.SaveChangesAsync(cancellationToken);
        return Unit.Value;
    }
}
