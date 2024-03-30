using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using new_usaha.Application.Common.Exceptions;
using new_usaha.Application.Common.Interfaces;
using new_usaha.Domain.Entities;

namespace new_usaha.Application.EnterpriseAddresses.Commands.UpdateEnterpriseAddress;

public class UpdateEnterpriseCommand : EnterpriseAddressDto, IRequest
{
}

public class UpdateEnterpriseCommandHandler : IRequestHandler<UpdateEnterpriseCommand>
{
    private readonly IApplicationDbContext _context;

    public UpdateEnterpriseCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task Handle(UpdateEnterpriseCommand request, CancellationToken cancellationToken)
    {
        var entity = await _context.EnterpriseAddresses
            .Where(p => p.EnterpriseId == request.EnterpriseId)
            .SingleOrDefaultAsync(cancellationToken);

        if (entity == null)
        {
            throw new NotFoundException(nameof(EnterpriseAddress), request.Id);
        }
        entity.City = request.City;
        entity.District = request.District;
        entity.Street = request.Street;
        entity.SubDistrict = request.SubDistrict;
        entity.Province = request.PostalCode;
        entity.PostalCode = request.PostalCode;

        _context.EnterpriseAddresses.Update(entity);

        await _context.SaveChangesAsync(cancellationToken);
    }
}
