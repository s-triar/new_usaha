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

namespace new_usaha.Application.CQRS.GoodsTypes.Queries;

public class GetGoodsTypesQuery : IRequest<IEnumerable<GoodsTypeDto>>
{
    public bool OnlyRoot { get; set; }
}

public class GetGoodsTypeQueryHandler : IRequestHandler<GetGoodsTypesQuery, IEnumerable<GoodsTypeDto>>
{
    private readonly IApplicationDbContext context;
    private readonly IMapper mapper;

    public GetGoodsTypeQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        this.context = context;
        this.mapper = mapper;
    }
    public async Task<IEnumerable<GoodsTypeDto>> Handle(GetGoodsTypesQuery request, CancellationToken cancellationToken)
    {
        var entities = this.context
                           .GoodsTypes.AsQueryable();
        if (!request.OnlyRoot)
        {
            entities = entities.Include(x => x.SubGoodsTypes);
            var res = await entities.ToListAsync(cancellationToken);
            var result = res.Select(this.mapper.Map<GoodsTypeDto>);
            return result;
        }
        else
        {
            var childrenOf = entities.ToLookup(x => x.ParentGoodsTypeId);

            foreach(var c in entities)
            {
                c.SubGoodsTypes = childrenOf[c.Id].ToList();
            }

            var roots = childrenOf[null].ToList();

            //var res = await entities.ToListAsync(cancellationToken);
            var result = roots.Select(this.mapper.Map<GoodsTypeDto>);
            return result;
            //entities = entities.Where(x => x.ParentGoodsTypeId == null)
            //                   .Include(x => x.SubGoodsTypes)
            //                     .ThenInclude(y => y.SubGoodsTypes)
            //                       .ThenInclude(y => y.SubGoodsTypes);
        }

       

    }
}
