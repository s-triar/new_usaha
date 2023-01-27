using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using new_usaha.Application.Common.Exceptions;
using new_usaha.Application.Common.Interfaces;
using new_usaha.Domain.Entities;

namespace new_usaha.Application.CQRS.Employees.Commands;

public class JoinEmployeeCommand: IRequest<Unit>
{
    public int Code { get; set; }
}
public class JoinEmployeeCommandValidator : AbstractValidator<JoinEmployeeCommand>
{
    public JoinEmployeeCommandValidator()
    {
        RuleFor(v => v.Code)
            .NotEmpty().WithMessage("Kode harus diisi.");
    }
}

public class JoinEmployeeCommandHandler : IRequestHandler<JoinEmployeeCommand, Unit>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserService _cs;
    private readonly ICurrentEnterpriseService _ce;
    private readonly IIdentityService _ids;
    public JoinEmployeeCommandHandler(
        IApplicationDbContext context,
        ICurrentUserService cs,
        ICurrentEnterpriseService ce,
        IIdentityService ids
        )
    {
        _context = context;
        _cs = cs;
        _ce = ce;
        _ids = ids;
    }

    public async Task<Unit> Handle(JoinEmployeeCommand request, CancellationToken cancellationToken)
    {
        DateTime now = DateTime.Now;
        var ej = await this._context.EmployeeJoins
                                    .Where(x => x.UserId == _cs.UserId)
                                    .Where(x => x.Code == request.Code)
                                    .Where(x=>x.ExpiredTime > now)
                                    .Where(x => x.IsUsed == false)
                                    .FirstOrDefaultAsync(cancellationToken);
        if (ej == null)
        {
            throw new NotFoundException("Kode tidak ditemukan atau sudah kadaluwarsa.");
        }
        var user = await _ids.GetMinimalInfoUserByIdAsync(ej.UserId);

        var new_employee = new EnterpriseEmployee
        {
            EnterpriseId = ej.EnterpriseId,
            Status="active",
            UserId = ej.UserId,
            UserName = user.Name,
            EnterpriseRoleId = ej.EnterpriseRoleId,
        };
        await _context.EnterpriseEmployees.AddAsync(new_employee, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
        return Unit.Value;
    }
}