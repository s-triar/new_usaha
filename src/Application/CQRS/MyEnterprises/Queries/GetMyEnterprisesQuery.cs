using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using new_usaha.Application.Common.Interfaces;
using new_usaha.Application.Common.Mappings;
using new_usaha.Application.Common.Models;

namespace new_usaha.Application.CQRS.MyEnterprises.Queries;
public class GetMyEnterprisesQuery : SearchPageRequest, IRequest<SearchPageResponse<MyEnterpriseDto>>
{
}

public class GetMyEnterpriseQueryHandler : IRequestHandler<GetMyEnterprisesQuery, SearchPageResponse<MyEnterpriseDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly ICurrentUserService _currentUserService;

    public GetMyEnterpriseQueryHandler(
        IApplicationDbContext context,
        IMapper mapper,
        ICurrentUserService currentUserService)
    {
        _context = context;
        _mapper = mapper;
        _currentUserService = currentUserService;
    }


    public async Task<SearchPageResponse<MyEnterpriseDto>> Handle(GetMyEnterprisesQuery request, CancellationToken cancellationToken)
    {
        request.Search = request.Search == null ? "" : request.Search.Trim().ToLower();
        var entities = await _context.Enterprises
                            .Include(x => x.EnterpriseEmployees)
                            .Include(x => x.EnterpriseType)
                            .Include(x => x.EnterpriseAddresses)
                            .Where(x => x.UserOwnerId == _currentUserService.UserId || x.EnterpriseEmployees.Any(y => y.UserId == _currentUserService.UserId))
                            .Where(x => string.IsNullOrEmpty(request.Search) ? true : x.Name.ToLower().Contains(request.Search.ToLower()))
                            .OrderBy(x => x.Name)
                            .ToSearchPageResponseAsync(request.PageNumber, request.PageSize);
        var res = new SearchPageResponse<MyEnterpriseDto>(entities.Items.Select(_mapper.Map<MyEnterpriseDto>).ToList(), entities.TotalCount, entities.PageNumber, request.PageSize);
        return res;
    }
}