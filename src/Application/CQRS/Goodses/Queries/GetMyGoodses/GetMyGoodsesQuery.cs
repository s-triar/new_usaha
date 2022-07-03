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

namespace new_usaha.Application.CQRS.Goodses.Queries.GetMyGoodses;

public class GetMyGoodsesQuery : SearchPageRequest, IRequest<SearchPageResponse<MyGoodsDto>>
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
       return await _context.Goodses
                                       .Include(x => x.GoodsType)
                                       .Include(x => x.GoodsPrices)
                                       .Include(x => x.GoodsStock)
                                       .Include(x => x.ParentGoods).ThenInclude(z => z.GoodsStock)
                                       .Include(x => x.ChildrenGoods).ThenInclude(z => z.GoodsStock)
                                       .Where(x => x.EnterpriseId.ToString() == this._currentEnterpriseService.EnterpriseId)
                                       .Where(x => x.Barcode.ToLower().Contains(request.Search) || (x.Name).ToLower().Contains(request.Search))
                                       .OrderBy(x => x.Name)
                                       .ProjectTo<MyGoodsDto>(_mapper.ConfigurationProvider)
                                       .ToSearchPageResponseAsync(request.PageNumber, request.PageSize);

        //var res = entities.Select(_mapper.Map<MyGoodsDto>);//.OrderBy(x=>x.Name).ToList();

        //var n = await _context.Goodses
        //                        .Where(x => x.EnterpriseId == request.EnterpriseId)
        //                        .Where(x => x.Barcode.ToLower().Contains(request.Search) || (x.Name).ToLower().Contains(request.Search))
        //                        .CountAsync(cancellationToken);

        //decimal k = n / (decimal)request.N;
        //int remainingPage = (int)Math.Ceiling(k);
        ////res = res.Take(request.N).Skip(((request.Page - 1) < 0 ? 0 : request.Page - 1) * request.N).ToList();

        //return new MyGoodsesContainerDto
        //{
        //    Data = res ?? new List<MyGoodsDto>(),
        //    NPage = remainingPage == 0 ? 1 : remainingPage
        //};
    }
}
