using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using new_usaha.Application.Common.Constants;
using new_usaha.Application.Common.Models;
using new_usaha.Application.CQRS.Goodses;
using new_usaha.Application.CQRS.Goodses.Commands.CreateGoods;
using new_usaha.Application.CQRS.Goodses.Commands.UpdateGoods;
using new_usaha.Application.CQRS.Goodses.Queries;
using new_usaha.Application.CQRS.Goodses.Queries.CheckDuplicateBarcode;
using new_usaha.Application.CQRS.Goodses.Queries.GetInfoOfGoodsForUpdating;
using new_usaha.Application.CQRS.Goodses.Queries.GetMyGoodses;
using new_usaha.WebUI.Controllers;
using new_usaha.Infrastructure.TokenValidator;

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
    public async Task<InfoOfGoodsForUpdatingDto> GetInfoOfGoodsForUpdating([FromQuery] GetInfoOfGoodsForUpdatingQuery query)
    {
        return await Mediator.Send(query);
    }

    [HttpPost]
    public async Task<Guid> Create([FromForm] CreateGoodsCommand commad)
    {
        return await Mediator.Send(commad);
    }
    [HttpPut]
    public async Task<Guid> Update([FromForm] UpdateGoodsCommand commad)
    {
        return await Mediator.Send(commad);
    }
    [HttpPut]
    public async Task<Guid> UpdateSellingPrice([FromBody] UpdateGoodsSellingPriceCommand commad)
    {
        return await Mediator.Send(commad);
    }
    [HttpPut]
    public async Task<Guid> AddStock([FromBody] AddStockCommand commad)
    {
        return await Mediator.Send(commad);
    }
    [HttpPut]
    public async Task<Guid> AdjustStock([FromBody] AdjustStockCommand commad)
    {
        return await Mediator.Send(commad);
    }
    [HttpGet]
    public async Task<IEnumerable<MyGoodsForCashierDto>> GetListProductForCashier([FromQuery] CashierProductSearchQuery query)
    {
        return await Mediator.Send(query);
    }
}
