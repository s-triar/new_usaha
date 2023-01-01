using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using new_usaha.Application.Common.Constants;
using new_usaha.Application.Common.Models;
//using new_usaha.Application.CQRS.Goodses.Commands.CreateGoods;
//using new_usaha.Application.CQRS.Goodses.Queries;
//using new_usaha.Application.CQRS.Goodses.Queries.GetInfoOfGoodsForUpdating;
//using new_usaha.Application.CQRS.Goodses.Queries.GetMyGoodses;
using new_usaha.WebUI.Controllers;
using new_usaha.Infrastructure.TokenValidator;
using new_usaha.Application.CQRS.MyGoodses.Queries;
using new_usaha.Application.CQRS.MyGoodses.Commands;

namespace new_usaha.WebUI.Controllers;

[Authorize]
public class GoodsController : ApiControllerBase
{
    [HttpGet]
    public async Task<bool> CheckDuplicateBarcode([FromQuery] CheckDuplicateBarcodeQuery query)
    {
        return await Mediator.Send(query);
    }
    [EnterpriseAuthorize("Workspace", "Goods", "Read")]
    [HttpGet]
    public async Task<SearchPageResponse<MyGoodsDto>> GetMyGoodses([FromQuery] GetMyGoodsesQuery query)
    {
        return await Mediator.Send(query);
    }
    [HttpGet]
    public async Task<MyGoodsInfoDto> GetInfoOfGoodsForUpdating([FromQuery] GetMyGoodsInfoQuery query)
    {
        return await Mediator.Send(query);
    }
    [HttpGet]
    public async Task<IEnumerable<MyGoodsForCashierDto>> GetListProductForCashier([FromQuery] GetCashierSearchQuery query)
    {
        return await Mediator.Send(query);
    }
}
