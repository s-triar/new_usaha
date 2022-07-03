using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using new_usaha.Application.Common.Interfaces;
using new_usaha.Application.Common.Mappings;
using new_usaha.Application.Common.Models;

namespace new_usaha.Application.CQRS.Employees.Queries;

public class GetEnterpriseEmployeeListQuery: SearchPageRequest, IRequest<SearchPageResponse<EnterpriseEmployeeDto>>
{
}

public class GetEnterpriseEmployeeListQueryHandler : IRequestHandler<GetEnterpriseEmployeeListQuery, SearchPageResponse<EnterpriseEmployeeDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IIdentityService _cs;
    private readonly ICurrentEnterpriseService _ce;
    private readonly IMapper _mapper;
    public GetEnterpriseEmployeeListQueryHandler(
        IApplicationDbContext context,
        IIdentityService cs,
        ICurrentEnterpriseService ce,
        IMapper mapper
        )
    {
        _context = context;
        _cs = cs;
        _ce = ce;
        _mapper = mapper;
    }

    public async Task<SearchPageResponse<EnterpriseEmployeeDto>> Handle(GetEnterpriseEmployeeListQuery request, CancellationToken cancellationToken)
    {
        request.Search = request.Search == null ? "" : request.Search.Trim().ToLower();

        return await _context.EnterpriseEmployees
                     .Include(x=>x.EnterpriseRole)
                     .Where(x => x.EnterpriseId.ToString() == this._ce.EnterpriseId)
                     .Where(x => x.UserName.ToLower().Contains(request.Search) || x.Id.ToString().Contains(request.Search) || x.UserId.Contains(request.Search))
                     .OrderBy(x=>x.UserName)
                     .ProjectTo<EnterpriseEmployeeDto>(_mapper.ConfigurationProvider)
                     .ToSearchPageResponseAsync(request.PageNumber, request.PageSize);

    }
}
