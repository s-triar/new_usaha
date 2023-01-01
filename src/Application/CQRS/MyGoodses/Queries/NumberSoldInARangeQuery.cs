using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using new_usaha.Application.Common.Interfaces;

namespace new_usaha.Application.CQRS.MyGoodses.Queries;
public class NumberSoldInARangeQuery:IRequest<ResultSoldLineDiagram>
{
    public Guid Id { get; set; }
    public int Year { get; set; }
    public DiagramRangeSoldType Type { get; set; }
}

public class NumberSoldInARangeQueryHandler : IRequestHandler<NumberSoldInARangeQuery, ResultSoldLineDiagram>
{
    private readonly IApplicationDbContext _context;

    public NumberSoldInARangeQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }
    public async Task<ResultSoldLineDiagram> Handle(NumberSoldInARangeQuery request, CancellationToken cancellationToken)
    {
        var items = this._context.GoodsOrdereds.Include(x => x.Order).Where(x => x.GoodsId == request.Id).Where(x => x.Order.CreatedAt.Year == request.Year).OrderBy(x => x.Order.CreatedAt)
                                                       .GroupBy(x => new { x.Order.CreatedAt.Year, x.Order.CreatedAt.Month, x.Order.CreatedAt.Day });
        switch (request.Type)
        {
            case DiagramRangeSoldType.SUM:
                var items_sum = items.Select(x => new ResultSoldLineDiagramItem { DateTime = new DateTime(x.Key.Year, x.Key.Month, x.Key.Day), N = x.Sum(y=>y.N) }).ToList();
                return await Task.FromResult(new ResultSoldLineDiagram
                {
                    Items = items_sum,
                    Type = request.Type,
                    Average = items_sum.Select(x => x.N).Average()
                });
            case DiagramRangeSoldType.AVERAGE:
                var items_avg = items.Select(x => new ResultSoldLineDiagramItem { DateTime = new DateTime(x.Key.Year, x.Key.Month, x.Key.Day), N = (decimal)x.Average(y => y.N) }).ToList();
                return await Task.FromResult(new ResultSoldLineDiagram
                {
                    Items = items_avg,
                    Type = request.Type,
                    Average = items_avg.Select(x => x.N).Average()
                });
            case DiagramRangeSoldType.MAX:
                var items_max = items.Select(x => new ResultSoldLineDiagramItem { DateTime = new DateTime(x.Key.Year, x.Key.Month, x.Key.Day), N = x.Max(y => y.N) }).ToList();
                return await Task.FromResult(new ResultSoldLineDiagram
                {
                    Items = items_max,
                    Type = request.Type,
                    Average = items_max.Select(x => x.N).Average()
                });
            case DiagramRangeSoldType.MIN:
                var items_min = items.Select(x => new ResultSoldLineDiagramItem { DateTime = new DateTime(x.Key.Year, x.Key.Month, x.Key.Day), N = x.Min(y => y.N) }).ToList();
                return await Task.FromResult(new ResultSoldLineDiagram
                {
                    Items = items_min,
                    Type = request.Type,
                    Average = items_min.Select(x => x.N).Average()
                });
            default:
                var items_default = items.Select(x => new ResultSoldLineDiagramItem { DateTime = new DateTime(x.Key.Year, x.Key.Month, x.Key.Day), N = x.Sum(y => y.N) }).ToList();
                return await Task.FromResult(new ResultSoldLineDiagram
                {
                    Items = items_default,
                    Type = request.Type,
                    Average = items_default.Select(x => x.N).Average()
                });
        }
    }
}
