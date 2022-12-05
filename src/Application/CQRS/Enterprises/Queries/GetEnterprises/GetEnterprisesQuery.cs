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
using new_usaha.Application.Common.Constants;
using new_usaha.Application.Common.Interfaces;
using new_usaha.Application.CQRS.Enterprises.Queries;

namespace new_usaha.Application.Enterprises.Queries.GetEnterprises;

public class GetEnterprisesQuery : IRequest<IEnumerable<EnterpriseDto>>
{
    public string? Name { get; set; }
    public string? TypeGroup { get; set; }
}
public class GetEnterprisesQueryHandler : IRequestHandler<GetEnterprisesQuery, IEnumerable<EnterpriseDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetEnterprisesQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    public async Task<IEnumerable<EnterpriseDto>> Handle(GetEnterprisesQuery request, CancellationToken cancellationToken)
    {
        //TODO implement TypeQueryGroup
        var entity = await _context.Enterprises_
                             .Include(r => r.EnterpriseType)
                             .Include(r => r.EnterpriseAddresses)
                             .Where(p =>
                               p.Name.ToLower().Contains(request.Name!.ToLower())
                             )
                             .ProjectTo<EnterpriseDto>(_mapper.ConfigurationProvider)
                             .ToListAsync(cancellationToken);

        return entity;
    }
}
