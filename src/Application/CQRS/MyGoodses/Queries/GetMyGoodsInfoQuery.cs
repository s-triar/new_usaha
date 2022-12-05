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

namespace new_usaha.Application.CQRS.MyGoodses.Queries;

public class GetMyGoodsInfoQuery : IRequest<MyGoodsInfoDto>
{
    public Guid Id { get; set; }
}

public class GetMyGoodsInfoQueryHandler : IRequestHandler<GetMyGoodsInfoQuery, MyGoodsInfoDto>
{
    private readonly IApplicationDbContext context;
    private readonly IMapper mapper;

    public GetMyGoodsInfoQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        this.context = context;
        this.mapper = mapper;
    }

    public async Task<MyGoodsInfoDto> Handle(GetMyGoodsInfoQuery request, CancellationToken cancellationToken)
    {
        var entity = await context.Goodses
                                      .Where(x => x.Id == request.Id)
                                      .Include(x => x.GoodsPrices)
                                      .Include(x => x.GoodsPhotos)
                                      .Include(x => x.ParentGoods)
                                      .Include(x => x.GoodsGroupMembers).ThenInclude(y => y.GoodsGroup).ThenInclude(z => z.Members).ThenInclude(xx => xx.Goods)
                                      .Include(x => x.GoodsStock).ThenInclude(y => y.AddStockHistories)
                                      .FirstOrDefaultAsync(cancellationToken);
        return mapper.Map<MyGoodsInfoDto>(entity);
    }
}
