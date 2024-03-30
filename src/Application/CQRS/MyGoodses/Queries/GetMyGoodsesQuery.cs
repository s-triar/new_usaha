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

namespace new_usaha.Application.CQRS.MyGoodses.Queries;
public class GetMyGoodsesQuery: SearchPageRequest, IRequest<SearchPageResponse<MyGoodsDto>>
{
}

public class GetMyGoodsesQueryHandler : IRequestHandler<GetMyGoodsesQuery, SearchPageResponse<MyGoodsDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentEnterpriseService _currentEnterpriseService;
    private readonly IMapper _mapper;

    public GetMyGoodsesQueryHandler(IApplicationDbContext context, ICurrentEnterpriseService currentEnterpriseService, IMapper mapper)
    {
        _context = context;
        _currentEnterpriseService = currentEnterpriseService;
        _mapper = mapper;
    }

    public async Task<SearchPageResponse<MyGoodsDto>> Handle(GetMyGoodsesQuery request, CancellationToken cancellationToken)
    {
        request.Search = request.Search == null ? "" : request.Search.Trim().ToLower();
        var entities = await _context.Goodses
                                        .Include(x => x.GoodsContainer).ThenInclude(z=>z.GoodsType)
                                        .Include(x => x.GoodsPrices)
                                        .Include(x => x.GoodsStock)
                                        .Include(x => x.ParentGoods).ThenInclude(z => z.GoodsStock)
                                        .Include(x => x.ChildrenGoods).ThenInclude(z => z.GoodsStock)
                                        .Where(x => x.GoodsContainer.EnterpriseId.ToString() == this._currentEnterpriseService.EnterpriseId)
                                        .Where(x => x.Barcode.ToLower().Contains(request.Search) || (x.Name).ToLower().Contains(request.Search))
                                        .OrderBy(x => x.Name)
                                        .ToSearchPageResponseAsync(request.PageNumber, request.PageSize);

        var res = new SearchPageResponse<MyGoodsDto>(entities.Items.Select(_mapper.Map<MyGoodsDto>).ToList(), entities.TotalCount, entities.PageNumber, request.PageSize);
        return res;
    }
}
