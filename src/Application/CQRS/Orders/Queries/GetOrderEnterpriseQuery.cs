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

namespace new_usaha.Application.CQRS.Orders.Queries;

public class GetOrderEnterpriseQuery : SearchPageRequest, IRequest<SearchPageResponse<OrderDto>>
{
    public Guid EnterpriseId { get; set; }
    public DateTime? StartCreatedAt { get; set; }
    public DateTime? EndCreatedAt { get; set; }
}
public class GetOrderEnterpriseQueryHandler : IRequestHandler<GetOrderEnterpriseQuery, SearchPageResponse<OrderDto>>
{
    private readonly IApplicationDbContext context;
    private readonly IMapper mapper;

    public GetOrderEnterpriseQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        this.context = context;
        this.mapper = mapper;
    }
    public async Task<SearchPageResponse<OrderDto>> Handle(GetOrderEnterpriseQuery request, CancellationToken cancellationToken)
    {
        var query = this.context.Orders
                            .Include(x => x.PaymentMethod)
                            .Include(x => x.OrderProgresses).ThenInclude(x => x.OrderStatus)
                            .Where(x => x.EnterpriseId == request.EnterpriseId);
        if (!string.IsNullOrEmpty(request.Search))
        {
            query = query.Where(x => x.Id.ToString().Contains(request.Search));
        }
        if (request.StartCreatedAt != null || request.EndCreatedAt != null)
        {
            query = query.Where(x => request.StartCreatedAt == null ? true : x.CreatedAt >= request.StartCreatedAt)
                         .Where(x => request.EndCreatedAt == null ? true : x.CreatedAt <= request.EndCreatedAt);
        }
        return await query
                           //.Skip(((request.Page - 1) < 0 ? 0 : request.Page - 1) * request.N)
                           //.Take(request.N)
                           .OrderByDescending(x => x.CreatedAt)

                           .ProjectTo<OrderDto>(this.mapper.ConfigurationProvider)
                           .ToSearchPageResponseAsync(request.PageNumber, request.PageSize);


        //var n = await query.CountAsync(cancellationToken);

        //decimal k = n / (decimal)request.N;
        //int remainingPage = (int)Math.Ceiling(k);
        //return new TransactionListContainer
        //{
        //    Data = entities ?? new List<OrderDto>(),
        //    NPage = remainingPage == 0 ? 1 : remainingPage
        //};
    }
}
