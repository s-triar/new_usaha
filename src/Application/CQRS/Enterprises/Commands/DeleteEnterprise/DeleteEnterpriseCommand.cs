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

namespace new_usaha.Application.Enterprises.Commands.DeleteEnterprise;

public class DeleteEnterpriseCommand : EnterpriseDto, IRequest
{
}
public class DeleteEnterpriseCommandHandler : IRequestHandler<DeleteEnterpriseCommand>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserService _cs;

    public DeleteEnterpriseCommandHandler(IApplicationDbContext context, ICurrentUserService cs)
    {
        _context = context;
        _cs = cs;
    }

    public async Task<Unit> Handle(DeleteEnterpriseCommand request, CancellationToken cancellationToken)
    {
        var entity = await _context.Enterprises
             .Where(l => l.Id == request.Id)
             .SingleOrDefaultAsync(cancellationToken);

        if (entity == null)
        {
            throw new NotFoundException(nameof(Enterprise), request.Id);
        }
        _context.Enterprises.Remove(entity);

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}
