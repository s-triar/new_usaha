using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using new_usaha.Application.Common.Interfaces;

namespace new_usaha.Application.CQRS.MyGoodses.Queries;




public class SellPriceChangeInARangeQuery:IRequest<ResultSellPriceLineDiagram>
{
    public Guid Id { get; set; }
    public int Year { get; set; }
    public DiagramRangeSellPriceType Type { get; set; }
}

public class SellPriceChangeInARangeQueryHandler : IRequestHandler<SellPriceChangeInARangeQuery, ResultSellPriceLineDiagram>
{
    private readonly IApplicationDbContext _context;

    public SellPriceChangeInARangeQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }
    public async Task<ResultSellPriceLineDiagram> Handle(SellPriceChangeInARangeQuery request, CancellationToken cancellationToken)
    {
        if(request.Type == DiagramRangeSellPriceType.PRICE)
        {
            var items = this._context.GoodsPrices.Where(x => x.GoodsId == request.Id).Where(x=>x.CreatedAt.Year == request.Year).OrderBy(x => x.CreatedAt).Select(x => new ResultSellPriceLineDiagramItem { DateTime = x.CreatedAt, Price = x.Price }).ToList();
            return await Task.FromResult(new ResultSellPriceLineDiagram
            {
                Items = items,
                Type = request.Type,
                Average = items.Select(x => x.Price).Average()
            });
        }
        else
        {
            var items = this._context.GoodsPrices.Where(x => x.GoodsId == request.Id).Where(x => x.CreatedAt.Year == request.Year).OrderBy(x => x.CreatedAt).Select(x => new ResultSellPriceLineDiagramItem { DateTime = x.CreatedAt, Price = x.Price }).ToList();
            var items_diff = items.Select(
                                        (x, idx) => new ResultSellPriceLineDiagramItem
                                        {
                                            DateTime = x.DateTime,
                                            Price = (idx == 0) ? x.Price : x.Price - items.ElementAt(idx - 1).Price
                                        }
                                    ).ToList();
                
            return await Task.FromResult(new ResultSellPriceLineDiagram
            {
                Items = items_diff,
                Type = request.Type,
                Average = items_diff.Select(x => x.Price).Average()
            });
        }
        

    }
}
