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

public class CreateEmployeeCommand: IRequest<Unit>
{
    public string Email { get; set; }
    public string EnterpriseRoleName { get; set; }
}

public class CreateEmployeeCommandValidator : EmployeeValidator<CreateEmployeeCommand>
{
    public CreateEmployeeCommandValidator(
        IApplicationDbContext context,
        IIdentityService identityContext,
        ICurrentEnterpriseService currentEnterprise
        ) 
        : base(context, identityContext, currentEnterprise)
    {

        RuleFor(v => v.Email)
            .NotEmpty().WithMessage("Email karyawan harus diisi.")
            .MustAsync(BeExistEmail).WithMessage("Email tidak ditemukan.");
        RuleFor(v => v.Email)
            .NotEmpty().WithMessage("Email karyawan harus diisi.")
            .MustAsync(BeUnregisteredEmployee).WithMessage("Email karyawan sudah terdaftar.");
        RuleFor(v => v.EnterpriseRoleName)
            .NotEmpty().WithMessage("Peran karyawan harus diisi.")
            .MustAsync(BeExistRole).WithMessage("Peran tidak ditemukan.");
    }
}

public class CreateEmployeeCommandHandler : IRequestHandler<CreateEmployeeCommand, Unit>
{
    private readonly IApplicationDbContext _context;
    private readonly IIdentityService _cs;
    private readonly ICurrentEnterpriseService _ce;
    //private readonly ISendEmailTemplateService _email;
    public CreateEmployeeCommandHandler(
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
    public async Task<Unit> Handle(CreateEmployeeCommand request, CancellationToken cancellationToken)
    {
        DateTime expiredTime = DateTime.Now.AddHours(2);
        EnterpriseRole enterpriseRole = await _context.EnterpriseRoles.FirstOrDefaultAsync(x => x.EnterpriseId.ToString() == _ce.EnterpriseId && x.Name.ToLower() == request.EnterpriseRoleName.ToLower(), cancellationToken);
        var usaha = await _context.Enterprises.FirstOrDefaultAsync(x => x.Id.ToString() == _ce.EnterpriseId, cancellationToken);
        var user = await _cs.GetMinimalInfoUserByEmailAsync(request.Email);
        var rand = new Random();
        string code = "";
        for (int ctr = 0; ctr < 6; ctr++)
        {
            var temp = rand.Next(0, 9).ToString();
            code += temp;
        }
        int code_int = int.Parse(code);
        var new_employee = new EmployeeJoin
        {
            Code = code_int,
            ExpiredTime = expiredTime,
            EnterpriseId = usaha.Id,
            IsUsed = false,
            UserId = user.Id,
            EnterpriseRoleId = enterpriseRole.Id
        };
        await _context.EmployeeJoins.AddAsync(new_employee, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
        //await _email.SendEmployeeHiredAsync(request.Email, usaha.Name, code, expiredTime);
        return Unit.Value;


    }
}

