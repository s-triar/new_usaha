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

namespace new_usaha.Application.CQRS.GoodsGroups.Queries.GetMyGoodsGroup;

public class GetMyGoodsGroupQuery: SearchPageRequest, IRequest<SearchPageResponse<MyGoodsGroupDto>>
{
}

public class GetMyGoodsGroupQueryHandler : IRequestHandler<GetMyGoodsGroupQuery, SearchPageResponse<MyGoodsGroupDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentEnterpriseService _currentEnterpriseService;
    private readonly IMapper _mapper;

    public GetMyGoodsGroupQueryHandler(IApplicationDbContext context, ICurrentEnterpriseService currentEnterpriseService, IMapper mapper)
    {
        _context = context;
        _currentEnterpriseService = currentEnterpriseService;
        _mapper = mapper;
    }
    public async Task<SearchPageResponse<MyGoodsGroupDto>> Handle(GetMyGoodsGroupQuery request, CancellationToken cancellationToken)
    {
        request.Search = request.Search == null ? "" : request.Search.Trim().ToLower();
        return await _context.GoodsGroups
                                            .Include(x=>x.Members).ThenInclude(y=>y.Goods).ThenInclude(z=>z.GoodsPhotos)
                                            .Where(x => x.EnterpriseId.ToString() == this._currentEnterpriseService.EnterpriseId)
                                            .Where(x=>x.Name.ToLower().Contains(request.Search))
                                            .OrderBy(x=>x.Name)
                                            .ProjectTo<MyGoodsGroupDto>(_mapper.ConfigurationProvider)
                                            .ToSearchPageResponseAsync(request.PageNumber, request.PageSize);
    }
}
