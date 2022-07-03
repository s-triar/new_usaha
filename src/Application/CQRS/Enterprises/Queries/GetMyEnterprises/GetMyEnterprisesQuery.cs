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

namespace new_usaha.Application.CQRS.Enterprises.Queries.GetMyEnterprises;

public class GetMyEnterprisesQuery : IRequest<IEnumerable<MyEnterpriseDto>>
{
    public string? Name { get; set; }
}

public class GetMyEnterpriseQueryHandler : IRequestHandler<GetMyEnterprisesQuery, IEnumerable<MyEnterpriseDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly ICurrentUserService _currentUserService;

    public GetMyEnterpriseQueryHandler(
        IApplicationDbContext context, 
        IMapper mapper,
        ICurrentUserService currentUserService)
    {
        _context = context;
        _mapper = mapper;
        _currentUserService = currentUserService;
    }


    public async Task<IEnumerable<MyEnterpriseDto>> Handle(GetMyEnterprisesQuery request, CancellationToken cancellationToken)
    {
        var entity = await _context.Enterprises
                            .Include(x => x.EnterpriseEmployees)
                            .Include(x => x.EnterpriseType)
                            .Include(x => x.EnterpriseAddresses)
                            .Where(x => x.UserOwnerId == _currentUserService.UserId || x.EnterpriseEmployees.Any(y=>y.UserId == _currentUserService.UserId))
                            .Where(x => string.IsNullOrEmpty(request.Name) ? true : x.Name.ToLower().Contains(request.Name.ToLower()))
                            //.ProjectTo<MyEnterpriseDto>(_mapper.ConfigurationProvider) // this will error. use select instead
                            .ToListAsync(cancellationToken);
        var res = entity.Select(_mapper.Map<MyEnterpriseDto>);
        return res;
    }
}
