using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using new_usaha.Application.Common.Interfaces;

namespace new_usaha.Application.CQRS.MyEnterprises.Queries;

public class CheckAvailableEnterpriseCodeQuery : IRequest<bool>
{
    public string? Code { get; set; }
}
public class CheckAvailableEnterpriseCodeQueryHandler : IRequestHandler<CheckAvailableEnterpriseCodeQuery, bool>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public CheckAvailableEnterpriseCodeQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    public async Task<bool> Handle(CheckAvailableEnterpriseCodeQuery request, CancellationToken cancellationToken)
    {
        if (string.IsNullOrEmpty(request.Code))
        {
            return false;
        }
        var entity = await _context.Enterprises
                             .Where(p => request.Code.Trim() == p.Code)
                             .SingleOrDefaultAsync(cancellationToken);
        return entity == null ? true : false;
    }


}
