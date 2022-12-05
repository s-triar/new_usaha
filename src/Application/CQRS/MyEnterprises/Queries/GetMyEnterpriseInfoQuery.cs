using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using new_usaha.Application.Common.Interfaces;
using new_usaha.Domain.Entities;

namespace new_usaha.Application.CQRS.MyEnterprises.Queries;

public class GetMyEnterpriseInfoQuery : IRequest<MyEnterpriseDto>
{
    public Guid Id { get; set; }
}

public class GetMyEnterpriseInfoQueryHandler : IRequestHandler<GetMyEnterpriseInfoQuery, MyEnterpriseDto>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly ICurrentUserService _currentUserService;

    public GetMyEnterpriseInfoQueryHandler(
        IApplicationDbContext context,
        IMapper mapper,
        ICurrentUserService currentUserService)
    {
        _context = context;
        _mapper = mapper;
        _currentUserService = currentUserService;
    }

    public async Task<MyEnterpriseDto> Handle(GetMyEnterpriseInfoQuery request, CancellationToken cancellationToken)
    {
        var entity = _context.Enterprises
                            .Include(x => x.EnterpriseEmployees)
                            .Include(x => x.EnterpriseType)
                            .Include(x => x.EnterpriseAddresses)
                            ;
        //.ProjectTo<MyEnterpriseDto>(_mapper.ConfigurationProvider) // this will error. use select instead
        //;
        var res = await _mapper.ProjectTo<MyEnterpriseDto>(entity).FirstOrDefaultAsync(x => x.Id == request.Id);
        return res;
    }
}