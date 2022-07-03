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

namespace new_usaha.Application.CQRS.EnterpriseTypes.Queries;

public class GetEnterpriseTypesQuery : IRequest<IEnumerable<EnterpriseTypeDto>>
{
}
public class GetEnterprisesQueryHandler : IRequestHandler<GetEnterpriseTypesQuery, IEnumerable<EnterpriseTypeDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetEnterprisesQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    public async Task<IEnumerable<EnterpriseTypeDto>> Handle(GetEnterpriseTypesQuery request, CancellationToken cancellationToken)
    {
        var entities = await _context.EnterpriseTypes
                                   .ProjectTo<EnterpriseTypeDto>(_mapper.ConfigurationProvider)
                                   .ToListAsync(cancellationToken);
        return entities;
        //var entity = await _context.EnterpriseTypes.ToListAsync(cancellationToken);
        //return _mapper.Map<IEnumerable<EnterpriseTypeDto>>(entity);
    }
}
