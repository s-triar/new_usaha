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

namespace new_usaha.Application.CQRS.Orders.Queries;

public class GetDetailOrderEnterpriseQuery : IRequest<DetailOrderDto?>
{
    public Guid Id { get; set; }
}

public class GetDetailOrderEnterpriseQueryHandler : IRequestHandler<GetDetailOrderEnterpriseQuery, DetailOrderDto?>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetDetailOrderEnterpriseQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    public async Task<DetailOrderDto?> Handle(GetDetailOrderEnterpriseQuery request, CancellationToken cancellationToken)
    {
        return await this._context.Orders
                                .Include(x => x.PaymentMethod)
                                .Include(x => x.OrderProgresses).ThenInclude(x => x.OrderStatus)
                                .Include(x => x.GoodsOrdereds).ThenInclude(x => x.Goods)
                                .ProjectTo<DetailOrderDto>(_mapper.ConfigurationProvider)
                                .FirstOrDefaultAsync(x => x.Id == request.Id);
    }
}
