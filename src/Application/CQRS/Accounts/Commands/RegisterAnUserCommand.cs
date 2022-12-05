using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;
using MediatR;
using new_usaha.Application.Common.Interfaces;
using new_usaha.Application.Common.Models;

namespace new_usaha.Application.CQRS.Accounts.Commands;
public class RegisterAnUserCommand: IRequest<ResultWithMessage>
{
    public string Fullname { get; set; }
    public string Email {get;set;}
    public string Phone {get;set;}
    public string Password {get;set;}
    public string ConfirmPassword {get;set;}
}

public class RegisterAnUserCommandValidator : AbstractValidator<RegisterAnUserCommand>
{
    private readonly IIdentityService _ids;

    public RegisterAnUserCommandValidator(
        IIdentityService ids
        )
    {
        _ids = ids;

        RuleFor(x => x.Fullname)
            .NotEmpty().WithMessage("Nama lengkap harus diisi.");
        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email harus diisi.")
            .MustAsync(
                (model, email, cancelToken) => { return this.BeUniqueEmail(email, cancelToken); }
            ).WithMessage("Email sudah digunakan.");
        RuleFor(x => x.Phone)
            .NotEmpty().WithMessage("Nomor telepon harus diisi.")
            .MustAsync(
                (model, phone, cancelToken) => { return this.BeUniquePhone(phone, cancelToken); }
            ).WithMessage("Nomor telepon sudah digunakan.");
        RuleFor(x => x.Password)
            .NotEmpty()
                .WithMessage("Password harus diisi.")
            .Must((model, password)=>password.Count() >= 6)
                .WithMessage("Minimal panjang password adalah 6 karakter.")
            .Must((model, password) => model.ConfirmPassword == password)
                .WithMessage("Password dan konfirmasi password tidak cocok");

        
        
    }

    public async Task<bool> BeUniqueEmail(string email, CancellationToken cancellationToken)
    {
        return !(await _ids.CheckExistByEmail(email));
    }
    public async Task<bool> BeUniquePhone(string phone, CancellationToken cancellationToken)
    {
        return !(await _ids.CheckExistByPhone(phone));
    }

}


public class RegisterAnUserCommandHandler : IRequestHandler<RegisterAnUserCommand, ResultWithMessage>
{
    private readonly IIdentityService _ids;

    public RegisterAnUserCommandHandler(
        IIdentityService ids
        )
    {
        _ids = ids;
    }
    public async Task<ResultWithMessage> Handle(RegisterAnUserCommand request, CancellationToken cancellationToken)
    {
        var res = await _ids.CreateUserAsync(request.Fullname, request.Email, request.Phone, request.Password);
        return new ResultWithMessage(res.Result.Succeeded, res.Result.Errors, res.Result.Succeeded ? "Pendaftaran berhasil.":"Pendaftaran gagal.");
    }
}