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

namespace new_usaha.Application.Enterprises.Queries.GetEnterprise;

public class GetEnterpriseQuery : IRequest<EnterpriseDto>
{
    public long Id { get; set; }
    public string Code { get; set; } 
    public string Type { get; set; } 
}
public class GetEnterpriseQueryHandler : IRequestHandler<GetEnterpriseQuery, EnterpriseDto>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetEnterpriseQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    public async Task<EnterpriseDto> Handle(GetEnterpriseQuery request, CancellationToken cancellationToken)
    {
        var entity = await _context.Enterprises
                             .Include(r => r.EnterpriseType)
                             .Include(r => r.EnterpriseAddresses)
                             //.Where(p => request.Type == TypeQuery.Prop.CODE ? p.Code == request.Code : p.Id == request.Id)
                             .SingleOrDefaultAsync(cancellationToken);

        return _mapper.Map<EnterpriseDto>(entity);
    }
}
