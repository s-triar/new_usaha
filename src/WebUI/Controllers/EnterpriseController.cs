using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using new_usaha.Application.Common.Interfaces;
using new_usaha.Application.CQRS.Enterprises;
using new_usaha.Application.CQRS.Enterprises.Queries;
using new_usaha.Application.CQRS.Enterprises.Queries.CheckAvailableEnterpriseCode;
using new_usaha.Application.CQRS.Enterprises.Queries.GetMyEnterprises;
using new_usaha.Application.CQRS.EnterpriseTypes.Queries;
using new_usaha.Application.EnterpriseAddresses.Commands.CreateEnterpriseAddress;
using new_usaha.Application.Enterprises.Commands.CreateEnterprise;
using new_usaha.WebUI.Controllers;

namespace new_usaha.WebUI.Controllers;

[Authorize]
public class EnterpriseController : ApiControllerBase
{
    private readonly IConfiguration configuration;
    public EnterpriseController(IConfiguration configuration) : base()
    {
        this.configuration = configuration;
    }
    [HttpGet]
    public async Task<IEnumerable<MyEnterpriseDto>> GetOwned([FromQuery] GetMyEnterprisesQuery query)
    {
        var result = await Mediator.Send(query);
        return result;
    }
    [HttpGet]
    public async Task<MyEnterpriseDto> GetMyEnterpriseInfo([FromQuery] GetMyEnterpriseInfoQuery query)
    {
        var result = await Mediator.Send(query);
        return result;
    }
    [HttpPost]
    public async Task<ActionResult<Guid>> Create([FromForm] CreateEnterpriseCommand command)
    {

        var EnterpriseId = await Mediator.Send(command);
        return EnterpriseId;
    }
    [HttpGet]
    public async Task<bool> CheckAvailableEnterpriseCode([FromQuery] CheckAvailableEnterpriseCodeQuery query)
    {
        return await Mediator.Send(query);
    }
    [HttpGet]
    public async Task<string[]> GetAvailableEnterpriseCode([FromQuery] GetAvailableEnterpriseCodeQuery query)
    {
        return await Mediator.Send(query);
    }
    [HttpGet]
    public async Task<EnterpriseTokenDto> GetEnterpriseToken([FromQuery] EnterpriseTokenQuery query)
    {
        var model = await Mediator.Send(query);

        var secret = this.configuration.GetValue<string>("EnterpriseSecret");
        var mySecurityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secret));

        var myIssuer = this.configuration.GetSection("ClientInfo").GetValue<string>("Authority");
        var myAudience = this.configuration.GetSection("ClientInfo").GetValue<string>("Audience");

        var tokenHandler = new JwtSecurityTokenHandler();
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new Claim[]
            {
                    new Claim(EnteerpriseClaimType.UserId, model.UserId),
                    new Claim(EnteerpriseClaimType.EnterpriseId, model.EnterpriseId),
                    new Claim(EnteerpriseClaimType.RoleId, model.RoleId),
            }),
            Expires = DateTime.UtcNow.AddHours(18), //Todo change with employee schedule hour shift
            Issuer = myIssuer,
            Audience = myAudience,
            SigningCredentials = new SigningCredentials(mySecurityKey, SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        return new EnterpriseTokenDto { Token = tokenHandler.WriteToken(token) };
    }
}
