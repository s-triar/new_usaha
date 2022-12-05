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

public class UpdateEnterpriseCommand : EnterpriseDto, IRequest<ResultWithMessage>
{
    public Guid EnterpriseTypeId { get; set; }
}
public class UpdateEnterpriseCommandHandler : IRequestHandler<UpdateEnterpriseCommand, ResultWithMessage>
{
    private readonly IApplicationDbContext _context;

    public UpdateEnterpriseCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<ResultWithMessage> Handle(UpdateEnterpriseCommand request, CancellationToken cancellationToken)
    {
        var entity = await _context.Enterprises
             .Where(l => l.Id == request.Id)
             .SingleOrDefaultAsync(cancellationToken);

        if (entity == null)
        {
            throw new NotFoundException(nameof(Enterprise), request.Id);
        }
        entity.Email = request.Email;
        entity.Name = request.Name;
        entity.Description = request.Description;
        entity.Phone = request.Phone;
        entity.Photo = request.Photo;

        _context.Enterprises.Update(entity);

        await _context.SaveChangesAsync(cancellationToken);

        return new ResultWithMessage(true, new List<string>() { }, "Pembaruan usaha berhasil");
    }
}
