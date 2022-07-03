using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using new_usaha.Application.Common.Interfaces;
using new_usaha.Domain.Entities;

namespace new_usaha.Application.CQRS.Employees.Commands;

public class DeleteEmployeeCommand : IRequest<Guid>
{
    public Guid Id { get; set; }
}

public class DeleteEmployeeCommandValidator : EmployeeValidator<DeleteEmployeeCommand>
{
    public DeleteEmployeeCommandValidator(
        IApplicationDbContext context,
        IIdentityService identityContext,
        ICurrentEnterpriseService currentEnterprise
        )
        : base(context, identityContext, currentEnterprise)
    {

        RuleFor(v => v.Id)
            .NotEmpty().WithMessage("karyawan harus diisi.")
            .MustAsync(BeRegisteredEmployee).WithMessage("Karyawan tidak ditemukan.");
    }
}
public class DeleteEmployeeCommandHandler : IRequestHandler<DeleteEmployeeCommand, Guid>
{
    private readonly IApplicationDbContext _context;
    private readonly IIdentityService _cs;
    private readonly ICurrentEnterpriseService _ce;
    //private readonly ISendEmailTemplateService _email;
    public DeleteEmployeeCommandHandler(
        IApplicationDbContext context,
        IIdentityService cs,
        ICurrentEnterpriseService ce
        //ISendEmailTemplateService email
        )
    {
        _context = context;
        _cs = cs;
        _ce = ce;
        //_email = email;
    }
    public async Task<Guid> Handle(DeleteEmployeeCommand request, CancellationToken cancellationToken)
    {
        EnterpriseEmployee employee = await _context.EnterpriseEmployees
                                        .FirstOrDefaultAsync(x =>
                                            x.EnterpriseId.ToString() == _ce.EnterpriseId &&
                                            x.Id == request.Id
                                        , cancellationToken: cancellationToken);
        var user = await _cs.GetMinimalInfoUserByIdAsync(employee.UserId);
        var enterprise = await _context.Enterprises.FirstOrDefaultAsync(x => x.Id.ToString() == _ce.EnterpriseId, cancellationToken);
        _context.EnterpriseEmployees.Remove(employee);
        await _context.SaveChangesAsync(cancellationToken);
        //await _email.SendEmployeeFiredAsync(user.Email, enterprise.Name);
        return employee.Id;
    }
}