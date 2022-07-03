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
using new_usaha.Application.Common.Mappings;
using new_usaha.Application.Common.Models;

namespace new_usaha.Application.CQRS.EnterpriseClaims.Queries;

public class GetEnterpriseRoleQuery : SearchPageRequest, IRequest<SearchPageResponse<EnterpriseRoleDto>>
{
}
public class GetEnterpriseRoleQueryHandler : IRequestHandler<GetEnterpriseRoleQuery, SearchPageResponse<EnterpriseRoleDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly ICurrentEnterpriseService currentEnterprise;

    public GetEnterpriseRoleQueryHandler(IApplicationDbContext context, IMapper mapper, ICurrentEnterpriseService currentEnterprise)
    {
        _context = context;
        _mapper = mapper;
        this.currentEnterprise = currentEnterprise;
    }
    public async Task<SearchPageResponse<EnterpriseRoleDto>> Handle(GetEnterpriseRoleQuery request, CancellationToken cancellationToken)
    {
        request.Search = request.Search == null ? "" : request.Search.Trim().ToLower();
        return  await _context.EnterpriseRoles
                                       .OrderBy(x => x.Name)
                                       .Where(x => x.EnterpriseId.ToString() == this.currentEnterprise.EnterpriseId)
                                       .Where(x => x.Name.ToLower().Contains(request.Search))
                                       .ProjectTo<EnterpriseRoleDto>(_mapper.ConfigurationProvider)
                                       .ToSearchPageResponseAsync(request.PageNumber, request.PageSize);
        //var res = entities.Select(_mapper.Map<EnterpriseRoleDto>);
        
        //var n = await _context.EnterpriseRoles
        //                        .Where(x => x.EnterpriseId.ToString() == this.currentEnterprise.EnterpriseId)
        //                        .Where(x => x.Name.ToLower().Contains(request.Search))
        //                        .CountAsync(cancellationToken);

        //decimal k = n / (decimal)request.N;
        //int remainingPage = (int)Math.Ceiling(k);
        ////res = res.Take(request.N).Skip(((request.Page - 1) < 0 ? 0 : request.Page - 1) * request.N).ToList();

        //return new EnterpriseRoleContainerDto
        //{
        //    Data = res ?? new List<EnterpriseRoleDto>(),
        //    NPage = remainingPage == 0 ? 1 : remainingPage
        //};
    }
}
