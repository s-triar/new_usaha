using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;
using MediatR;
using new_usaha.Application.Common.Interfaces;

namespace new_usaha.Application.CQRS.Accounts.Commands;
public class LoginCommand: IRequest<ResultUserLogin>
{
    public string Identifier { get; set; }
    public string Password { get; set; }
}

public class LoginCommandValidator: AbstractValidator<LoginCommand>
{
    public LoginCommandValidator()
    {
        RuleFor(v => v.Identifier)
                .NotEmpty().WithMessage("Email harus diisi.");
        RuleFor(v => v.Password)
                .NotEmpty().WithMessage("Password harus diisi.");
    }
}

public class LoginCommandHandler : IRequestHandler<LoginCommand, ResultUserLogin>
{
    private readonly IIdentityService _ids;

    public LoginCommandHandler(IIdentityService ids)
    {
        _ids = ids;
    }
    public async Task<ResultUserLogin> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        return await _ids.SignInWithEmailAndPasword(request.Identifier, request.Password);
    }
}