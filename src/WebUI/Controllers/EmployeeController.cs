using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using new_usaha.Infrastructure.TokenValidator;
using new_usaha.Application.CQRS.Employees;
using new_usaha.Application.CQRS.Employees.Queries;
using new_usaha.Application.CQRS.EnterpriseClaims;
using new_usaha.Application.CQRS.EnterpriseClaims.Queries;
using new_usaha.WebUI.Controllers;
using new_usaha.Application.Common.Models;
using new_usaha.Application.CQRS.Employees.Commands;
using new_usaha.Application.Common.Interfaces;
using MediatR;

namespace new_usaha.WebUI.Controllers;

[Authorize]
public class EmployeeController : ApiControllerBase
{
    [HttpGet]
    public async Task<bool> CheckAvailableCandidateEmployee([FromQuery] CheckAvailableCandidateEmployeeQuery query)
    {
        return await Mediator.Send(query);
    }
    
    [HttpGet]
    public async Task<SearchPageResponse<EnterpriseEmployeeDto>> GetEnterpriseEmployeeList([FromQuery] GetEnterpriseEmployeeListQuery query)
    {
        return await Mediator.Send(query);
    }
    //[HttpGet]
    //public async Task<EnterpriseEmployeeDto> GetEnterpriseEmployee([FromQuery] GetEnterpriseEmployeeQuery query)
    //{
    //    return await Mediator.Send(query);
    //}
    [HttpGet]
    public async Task<EnterpriseEmployeeDetailDto> GetDetailEnterpriseEmployee([FromQuery] GetDetailEnterpriseEmployeeQuery query)
    {
        return await Mediator.Send(query);
    }
    [HttpGet]
    public async Task<UserMinimalInfo> GetCandidateEmployee([FromQuery] GetCandidateEmployeeQuery query)
    {
        return await Mediator.Send(query);
    }

    //[EnterpriseAuthorize("Dashboard", "Peran", "Buat")]
    [HttpPost]
    public async Task<Unit> CreateEmployee([FromBody] CreateEmployeeCommand command)
    {
        return await Mediator.Send(command);
    }
    [HttpPut]
    public async Task<Unit> UpdateEmployee([FromBody] UpdateEmployeeCommand command)
    {
        return await Mediator.Send(command);
    }
    [HttpPut]
    public async Task<Unit> DeleteEmployee([FromBody] DeleteEmployeeCommand command)
    {
        return await Mediator.Send(command);
    }
    
    [HttpPost]
    public async Task<Unit> JoinEmployee([FromBody] JoinEmployeeCommand command)
    {
        return await Mediator.Send(command);
    }
}
