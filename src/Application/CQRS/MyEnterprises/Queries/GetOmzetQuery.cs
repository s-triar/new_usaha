using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using new_usaha.Application.Common.Interfaces;

namespace new_usaha.Application.CQRS.MyEnterprises.Queries;
public class GetOmzetQuery:IRequest<ResultOmzetLineDiagram>
{
    public int Year { get; set; }
    
}

public class GetOmzetQueryHandler : IRequestHandler<GetOmzetQuery, ResultOmzetLineDiagram>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentEnterpriseService _currentEnterprise;

    public GetOmzetQueryHandler(IApplicationDbContext context, ICurrentEnterpriseService currentEnterprise)
    {
        _context = context;
        _currentEnterprise = currentEnterprise;
    }
    public async Task<ResultOmzetLineDiagram> Handle(GetOmzetQuery request, CancellationToken cancellationToken)
    {
        var items = this._context.Orders.Where(x => x.EnterpriseId.ToString() == this._currentEnterprise.EnterpriseId)
                                        .Where(x => x.CreatedAt.Year == request.Year)
                                        .OrderBy(x => x.CreatedAt)
                                        .GroupBy(x => new { x.CreatedAt.Year, x.CreatedAt.Month, x.CreatedAt.Day })
                                        .Select(x => new ResultOmzetLineDiagramItem { DateTime = new DateTime(x.Key.Year, x.Key.Month, x.Key.Day), Total = x.Sum(y => y.Total) }).ToList();

        return await Task.FromResult(new ResultOmzetLineDiagram
        {
            Items=items,
            Average=items.Select(x=>x.Total).Average()
        });
    }
}
