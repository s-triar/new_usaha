using AutoMapper;
using AutoMapper.QueryableExtensions;
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

namespace new_usaha.Application.CQRS.EnterpriseClaims.Queries;

public class GetEnterpriseRoleClaimsQuery : IRequest<EnterpriseRoleDetailDto>
{
    public Guid Id { get; set; }

}
public class GetEnterpriseRoleClaimsQueryValidator : AbstractValidator<GetEnterpriseRoleClaimsQuery>
{
    private readonly IApplicationDbContext context;
    private readonly ICurrentEnterpriseService currentEnterprise;

    public GetEnterpriseRoleClaimsQueryValidator(IApplicationDbContext context, ICurrentEnterpriseService currentEnterprise)
    {
        this.context = context;
        this.currentEnterprise = currentEnterprise;

        RuleFor(k => k.Id)
            .NotEmpty().WithMessage("Id harus ada.")
            .Must((model, id, cancelToken) => (this.context.EnterpriseRoles.Any(x => x.EnterpriseId.ToString() == this.currentEnterprise.EnterpriseId && id == x.Id)))
            .WithMessage("Peran tidak ditemukan");

    }
}
public class GetEnterpriseRoleClaimsQueryHandler : IRequestHandler<GetEnterpriseRoleClaimsQuery, EnterpriseRoleDetailDto?>
{
    private readonly IApplicationDbContext context;
    private readonly ICurrentUserService userService;
    private readonly ICurrentEnterpriseService currentEnterprise;
    private readonly IMapper mapper;

    public GetEnterpriseRoleClaimsQueryHandler(IApplicationDbContext context, ICurrentUserService userService, ICurrentEnterpriseService currentEnterprise, IMapper mapper)
    {
        this.context = context;
        this.userService = userService;
        this.currentEnterprise = currentEnterprise;
        this.mapper = mapper;
    }
    public async Task<EnterpriseRoleDetailDto?> Handle(GetEnterpriseRoleClaimsQuery request, CancellationToken cancellationToken)
    {
        return await this.context.EnterpriseRoles
                                 .Include(x => x.EnterpriseRoleClaims)
                                 .Where(x => x.EnterpriseId.ToString() == this.currentEnterprise.EnterpriseId && x.Id == request.Id)
                                 .ProjectTo<EnterpriseRoleDetailDto>(this.mapper.ConfigurationProvider)
                                 .FirstOrDefaultAsync(cancellationToken);

    }
}
