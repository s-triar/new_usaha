using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using new_usaha.Application.Common.Interfaces;

namespace new_usaha.Application.CQRS.Employees;

public class EmployeeValidator<T>: AbstractValidator<T>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentEnterpriseService _currentEnterprise;
    private readonly IIdentityService _identity;
    public EmployeeValidator(
        IApplicationDbContext context,
        IIdentityService auth_context,
        ICurrentEnterpriseService currentEnterprise)
    {
        _context = context;
        _currentEnterprise = currentEnterprise;
        _identity = auth_context;
    }
    public async Task<bool> BeExistEmail(string Email, CancellationToken cancellationToken)
    {
        return await _identity.CheckExistByEmail(Email);
    }
    public async Task<bool> BeExistRole(string RoleName, CancellationToken cancellationToken)
    {
        return await _context.EnterpriseRoles.AnyAsync(x=>x.EnterpriseId.ToString() == _currentEnterprise.EnterpriseId && x.Name.ToLower() == RoleName.ToLower());
    }
    public async Task<bool> BeUnregisteredEmployee(string Email, CancellationToken cancellationToken)
    {
        UserMinimalInfo userinfo = await _identity.GetMinimalInfoUserByEmailAsync(Email);
        return !(await _context.EnterpriseEmployees
            .AnyAsync(
            x =>
                x.EnterpriseId.ToString() == _currentEnterprise.EnterpriseId &&
                x.UserId == userinfo.Id
            , cancellationToken));
    }

    public async Task<bool> BeRegisteredEmployee(Guid Id, CancellationToken cancellationToken)
    {
        return await _context.EnterpriseEmployees
            .AnyAsync(
            x =>
                x.EnterpriseId.ToString() == _currentEnterprise.EnterpriseId &&
                x.Id == Id
            , cancellationToken);
    }


}
