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
using new_usaha.Application.CQRS.Enterprises.Queries;
using new_usaha.Application.Common.Models;

namespace new_usaha.Application.CQRS.MyEnterprises.Commands;

public class DeleteEnterpriseCommand : IRequest<Unit>
{
    public Guid Id { get; set; }
}
public class DeleteEnterpriseCommandHandler : IRequestHandler<DeleteEnterpriseCommand, Unit>
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
             .Where(l => l.UserOwnerId == _cs.UserId)
             .SingleOrDefaultAsync(cancellationToken);

        if (entity == null)
        {
            throw new NotFoundException(nameof(Enterprise), request.Id);
        }
        _context.Enterprises.Remove(entity);

        await _context.SaveChangesAsync(cancellationToken);

        //return new ResultWithMessage(true, new List<string> { }, "Berhasil menghapus usaha");
        return Unit.Value;

    }
}
