using AutoMapper;
using AutoMapper.QueryableExtensions;
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

public class GetAllEnterpriseClaimsQuery : IRequest<List<EnterpriseClaimDto>>
{
}
public class GetAllEnterpriseClaimsQueryHandler : IRequestHandler<GetAllEnterpriseClaimsQuery, List<EnterpriseClaimDto>>
{
    private readonly IApplicationDbContext context;
    private readonly IMapper mapper;
    private readonly ICurrentEnterpriseService currentEnterprise;
    public GetAllEnterpriseClaimsQueryHandler(IApplicationDbContext context, IMapper mapper, ICurrentEnterpriseService currentEnterprise)
    {
        this.context = context;
        this.mapper = mapper;
        this.currentEnterprise = currentEnterprise;
    }
    public async Task<List<EnterpriseClaimDto>> Handle(GetAllEnterpriseClaimsQuery request, CancellationToken cancellationToken)
    {
        var enterprise = await this.context.Enterprises.FirstOrDefaultAsync(x => x.Id.ToString() == this.currentEnterprise.EnterpriseId);
        var entities = await this.context.EnterpriseClaims
                            .Where(x => x.EnterpriseTypeId == enterprise!.EnterpriseTypeId)
                            .ProjectTo<EnterpriseClaimDto>(this.mapper.ConfigurationProvider)
                            .ToListAsync(cancellationToken: cancellationToken);
        return entities ?? new List<EnterpriseClaimDto>();
    }
}
