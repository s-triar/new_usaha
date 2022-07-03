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

namespace new_usaha.Application.CQRS.Goodses.Queries.GetInfoOfGoodsForUpdating;

public class GetInfoOfGoodsForUpdatingQuery : IRequest<InfoOfGoodsForUpdatingDto>
{
    public Guid Id { get; set; }
}

public class GetInfoOfGoodsForUpdatingQueryHandler : IRequestHandler<GetInfoOfGoodsForUpdatingQuery, InfoOfGoodsForUpdatingDto>
{
    private readonly IApplicationDbContext context;
    private readonly IMapper mapper;

    public GetInfoOfGoodsForUpdatingQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        this.context = context;
        this.mapper = mapper;
    }

    public async Task<InfoOfGoodsForUpdatingDto> Handle(GetInfoOfGoodsForUpdatingQuery request, CancellationToken cancellationToken)
    {
        var entity = await this.context.Goodses
                                      .Where(x => x.Id == request.Id)
                                      .Include(x => x.GoodsPrices)
                                      .Include(x=>x.GoodsPhotos)
                                      .Include(x=>x.ParentGoods)
                                      .Include(x=>x.GoodsGroupMembers).ThenInclude(y=>y.GoodsGroup).ThenInclude(z=>z.Members).ThenInclude(xx=>xx.Goods)
                                      .Include(x => x.GoodsStock).ThenInclude(y => y.AddStockHistories)
                                      .FirstOrDefaultAsync(cancellationToken);
        return this.mapper.Map<InfoOfGoodsForUpdatingDto>(entity);
    }
}
