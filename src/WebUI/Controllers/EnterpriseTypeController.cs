using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using new_usaha.Application.CQRS.EnterpriseTypes;
using new_usaha.Application.CQRS.EnterpriseTypes.Queries;
using new_usaha.Domain.Entities;
using new_usaha.WebUI.Controllers;

namespace new_usaha.WebUI.Controllers;

[Authorize]
public class EnterpriseTypeController : ApiControllerBase
{
    [AllowAnonymous]
    [HttpGet]
    public async Task<IEnumerable<EnterpriseTypeDto>> GetAll()
    {
        return await Mediator.Send(new GetEnterpriseTypesQuery());
    }
}
