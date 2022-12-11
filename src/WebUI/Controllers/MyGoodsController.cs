using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using new_usaha.Application.Common.Models;
using new_usaha.Application.CQRS.MyGoodses.Commands;
using new_usaha.Application.CQRS.MyGoodses.Queries;
using new_usaha.Infrastructure.TokenValidator;

namespace new_usaha.WebUI.Controllers;


[Authorize]
public class MyGoodsController : ApiControllerBase
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

    [HttpPost]
    public async Task<ResultWithMessage> Create([FromForm] CreateMyGoodsCommand commad)
    {
        return await Mediator.Send(commad);
    }
    [HttpPut]
    public async Task<ResultWithMessage> Update([FromForm] UpdateMyGoodsCommand commad)
    {
        return await Mediator.Send(commad);
    }
    [HttpPut]
    public async Task<ResultWithMessage> UpdateSellingPrice([FromBody] UpdateMyGoodsSellingPriceCommand commad)
    {
        return await Mediator.Send(commad);
    }
    [HttpPut]
    public async Task<ResultWithMessage> AddStock([FromBody] AddMyGoodsStockCommand commad)
    {
        return await Mediator.Send(commad);
    }
    [HttpPut]
    public async Task<ResultWithMessage> AdjustStock([FromBody] AdjustStockCommand commad)
    {
        return await Mediator.Send(commad);
    }
    [HttpGet]
    public async Task<IEnumerable<MyGoodsForCashierDto>> GetListProductForCashier([FromQuery] GetCashierSearchQuery query)
    {
        return await Mediator.Send(query);
    }
}