using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using new_usaha.Application.CQRS.GoodsTypes;
using new_usaha.Application.CQRS.GoodsTypes.Queries;
using new_usaha.WebUI.Controllers;

namespace new_usaha.WebUI.Controllers;

[Authorize]
public class GoodsTypeController : ApiControllerBase
{
    [AllowAnonymous]
    [HttpGet]
    public async Task<IEnumerable<GoodsTypeDto>> GetAll([FromQuery] GetGoodsTypesQuery query)
    {
        return await Mediator.Send(query);
    }
}
