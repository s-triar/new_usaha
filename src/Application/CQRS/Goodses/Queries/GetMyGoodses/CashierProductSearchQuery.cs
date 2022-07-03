﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using new_usaha.Application.Common.Interfaces;

namespace new_usaha.Application.CQRS.Goodses.Queries.GetMyGoodses;

public class CashierProductSearchQuery : IRequest<IEnumerable<MyGoodsForCashierDto>>
{
    public string Search { get; set; }
    public Guid EnterpriseId { get; set; }
}
public class CashierProductSearchQueryHandler : IRequestHandler<CashierProductSearchQuery, IEnumerable<MyGoodsForCashierDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public CashierProductSearchQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    public async Task<IEnumerable<MyGoodsForCashierDto>> Handle(CashierProductSearchQuery request, CancellationToken cancellationToken)
    {
        request.Search = request.Search == null ? "" : request.Search.ToLower();
        var entities = await this._context.Goodses
                                       .Include(x => x.GoodsPrices)
                                       .Where(x => x.EnterpriseId == request.EnterpriseId)
                                       .Where(x => x.Barcode.ToLower().Contains(request.Search) || (x.Name).ToLower().Contains(request.Search) )
                                       .OrderBy(x => x.Name)
                                       .ToListAsync(cancellationToken);
        var res = entities.Select(_mapper.Map<MyGoodsForCashierDto>);
        return res ?? new List<MyGoodsForCashierDto>();
    }
}
