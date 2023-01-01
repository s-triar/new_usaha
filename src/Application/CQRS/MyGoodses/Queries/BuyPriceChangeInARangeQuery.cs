using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using new_usaha.Application.Common.Interfaces;

namespace new_usaha.Application.CQRS.MyGoodses.Queries;
public class BuyPriceChangeInARangeQuery:IRequest<ResultBuyPriceLineDiagram>
{
    public Guid Id { get; set; }
    public int Year { get; set; }
    public DiagramRangeBuyPriceType Type { get; set; }
}
public class BuyPriceChangeInARangeQueryHandler : IRequestHandler<BuyPriceChangeInARangeQuery, ResultBuyPriceLineDiagram>
{
    private readonly IApplicationDbContext _context;

    public BuyPriceChangeInARangeQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }
    public async Task<ResultBuyPriceLineDiagram> Handle(BuyPriceChangeInARangeQuery request, CancellationToken cancellationToken)
    {
        if (request.Type == DiagramRangeBuyPriceType.PRICE)
        {
            var items = this._context.AddStockHistories.Include(x=>x.GoodsStock).Where(x => x.GoodsStock.GoodsId == request.Id).Where(x => x.CreatedAt.Year == request.Year).OrderBy(x => x.CreatedAt).Select(x => new ResultBuyPriceLineDiagramItem { DateTime = x.CreatedAt, Price = x.PricePerItem }).ToList();
            return await Task.FromResult(new ResultBuyPriceLineDiagram
            {
                Items = items,
                Type = request.Type,
                Average = items.Select(x => x.Price).Average()
            });
        }
        else
        {
            var items = this._context.AddStockHistories.Include(x => x.GoodsStock).Where(x => x.GoodsStock.GoodsId == request.Id).Where(x => x.CreatedAt.Year == request.Year).OrderBy(x => x.CreatedAt).Select(x => new ResultBuyPriceLineDiagramItem { DateTime = x.CreatedAt, Price = x.PricePerItem }).ToList();
            var items_diff = items.Select(
                                        (x, idx) => new ResultBuyPriceLineDiagramItem
                                        {
                                            DateTime = x.DateTime,
                                            Price = (idx == 0) ? x.Price : x.Price - items.ElementAt(idx - 1).Price
                                        }
                                    ).ToList();

            return await Task.FromResult(new ResultBuyPriceLineDiagram
            {
                Items = items_diff,
                Type = request.Type,
                Average = items_diff.Select(x => x.Price).Average()
            });
        }
    }
}