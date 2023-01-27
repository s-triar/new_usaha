using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using new_usaha.Infrastructure.TokenValidator;
using new_usaha.Application.Common.Models;
using new_usaha.Application.CQRS.EnterpriseClaims;
using new_usaha.Application.CQRS.EnterpriseClaims.Commands;
using new_usaha.Application.CQRS.EnterpriseClaims.Queries;
using new_usaha.WebUI.Controllers;
using MediatR;

namespace new_usaha.WebUI.Controllers;

[Authorize]
public class RoleController : ApiControllerBase
{
    [EnterpriseAuthorize("Dashboard", "Peran", "Lihat")]
    [HttpGet]
    public async Task<List<EnterpriseClaimDto>> GetEnterpriseClaim([FromQuery] GetAllEnterpriseClaimsQuery query)
    {
        return await Mediator.Send(query);
    }
    [EnterpriseAuthorize("Dashboard", "Peran", "Lihat")]
    [HttpGet]
    public async Task<EnterpriseRoleDetailDto> GetEnterpriseRoleClaim([FromQuery] GetEnterpriseRoleClaimsQuery query)
    {
        return await Mediator.Send(query);
    }
    [EnterpriseAuthorize("Dashboard", "Peran", "Lihat")]
    [HttpGet]
    public async Task<SearchPageResponse<EnterpriseRoleDto>> GetEnterpriseRolePage([FromQuery] GetEnterpriseRoleQuery query)
    {
        return await Mediator.Send(query);
    }
    [EnterpriseAuthorize("Dashboard", "Peran", "Lihat")]
    [HttpGet]
    public async Task<IEnumerable<EnterpriseRoleDto>> GetEnterpriseRoleList([FromQuery] GetEnterpriseRoleListQuery query)
    {
        return await Mediator.Send(query);
    }

    [EnterpriseAuthorize("Dashboard", "Peran", "Buat")]
    [HttpGet]
    public async Task<bool> CheckDuplicateRoleName([FromQuery] CheckDuplicateRoleNameQuery query)
    {
        return (bool) await Mediator.Send(query);
    }

    [EnterpriseAuthorize("Dashboard", "Peran", "Buat")]
    [HttpPost]
    public async Task<Unit> CreateRole([FromBody] CreateRoleCommand command)
    {
        return await Mediator.Send(command);
    }
    [EnterpriseAuthorize("Dashboard", "Peran", "Buat")]
    [HttpPut]
    public async Task<Guid> UpdateRole([FromBody] UpdateRoleCommand command)
    {
        return await Mediator.Send(command);
    }
    [EnterpriseAuthorize("Dashboard", "Peran", "Buat")]
    [HttpPut]
    public async Task<Guid> DeleteRole([FromBody] DeleteRoleCommand command)
    {
        return await Mediator.Send(command);
    }

}
