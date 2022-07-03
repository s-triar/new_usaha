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

public class UpdateEmployeeCommand: IRequest<Guid>
{
    public Guid Id { get; set; }
    public string EnterpriseRoleName { get; set; }
}
public class UpdateEmployeeCommandValidator : EmployeeValidator<UpdateEmployeeCommand>
{
    public UpdateEmployeeCommandValidator(
        IApplicationDbContext context,
        IIdentityService identityContext,
        ICurrentEnterpriseService currentEnterprise
        )
        : base(context, identityContext, currentEnterprise)
    {

        RuleFor(v => v.EnterpriseRoleName)
            .NotEmpty().WithMessage("Peran karyawan harus diisi.")
            .MustAsync(BeExistRole).WithMessage("Peran tidak ditemukan.");
        RuleFor(v => v.Id)
            .NotEmpty().WithMessage("karyawan harus diisi.")
            .MustAsync(BeRegisteredEmployee).WithMessage("Karyawan tidak ditemukan.");
    }
}

public class UpdateEmployeeCommandHandler : IRequestHandler<UpdateEmployeeCommand, Guid>
{
    private readonly IApplicationDbContext _context;
    private readonly IIdentityService _cs;
    private readonly ICurrentEnterpriseService _ce;
    public UpdateEmployeeCommandHandler(
        IApplicationDbContext context,
        IIdentityService cs,
        ICurrentEnterpriseService ce
        )
    {
        _context = context;
        _cs = cs;
        _ce = ce;
    }
    public async Task<Guid> Handle(UpdateEmployeeCommand request, CancellationToken cancellationToken)
    {
        EnterpriseRole enterpriseRole = await _context.EnterpriseRoles.FirstOrDefaultAsync(x => x.EnterpriseId.ToString() == _ce.EnterpriseId && x.Name.ToLower() == request.EnterpriseRoleName.ToLower());
        EnterpriseEmployee employee = await _context.EnterpriseEmployees
                                        .FirstOrDefaultAsync(x => 
                                            x.EnterpriseId.ToString() == _ce.EnterpriseId &&
                                            x.Id == request.Id
                                        , cancellationToken: cancellationToken);
        employee.EnterpriseRoleId = enterpriseRole.Id;
        _context.EnterpriseEmployees.Update(employee);
        await _context.SaveChangesAsync(cancellationToken);
        return employee.Id;
    }
}