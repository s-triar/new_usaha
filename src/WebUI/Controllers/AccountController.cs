using Microsoft.AspNetCore.Mvc;
using new_usaha.Application.Common.Interfaces;
using new_usaha.Application.Common.Models;
using new_usaha.Application.CQRS.Accounts.Commands;
using new_usaha.Application.CQRS.Accounts.Queries;

namespace new_usaha.WebUI.Controllers;
public class AccountController : ApiControllerBase
{
    [HttpPost]
    public async Task<ResultUserLogin> Login([FromBody] LoginCommand command)
    {
        return await Mediator.Send(command);
    }
    [HttpPost]
    public async Task<ResultWithMessage> Register([FromBody] RegisterAnUserCommand command)
    {
        return await Mediator.Send(command);
    }
    [HttpGet]
    public async Task<bool> CheckDuplicateEmail([FromQuery] CheckDuplicateEmailQuery query)
    {
        return await Mediator.Send(query);
    }
    [HttpGet]
    public async Task<bool> CheckDuplicatePhone([FromQuery] CheckDuplicatePhoneQuery query)
    {
        return await Mediator.Send(query);
    }
}
