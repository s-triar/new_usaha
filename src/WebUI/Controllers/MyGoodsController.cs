using MediatR;
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
    public async Task<Unit> Create([FromForm] CreateMyGoodsCommand commad)
    {
        return await Mediator.Send(commad);
    }
    [HttpPut]
    public async Task<Unit> Update([FromForm] UpdateMyGoodsCommand commad)
    {
        return await Mediator.Send(commad);
    }
    [HttpPut]
    public async Task<Unit> UpdateSellingPrice([FromBody] UpdateMyGoodsSellingPriceCommand commad)
    {
        return await Mediator.Send(commad);
    }
    [HttpPut]
    public async Task<Unit> AddStock([FromBody] AddMyGoodsStockCommand commad)
    {
        return await Mediator.Send(commad);
    }
    [HttpPut]
    public async Task<Unit> AdjustStock([FromBody] AdjustMyGoodsStockCommand commad)
    {
        return await Mediator.Send(commad);
    }
    [HttpGet]
    public async Task<IEnumerable<MyGoodsForCashierDto>> GetListProductForCashier([FromQuery] GetCashierSearchQuery query)
    {
        return await Mediator.Send(query);
    }

    [HttpGet]
    public async Task<ResultSellPriceLineDiagram> GetListProductSellPrice([FromQuery] SellPriceChangeInARangeQuery query)
    {
        return await Mediator.Send(query);
    }
    [HttpGet]
    public async Task<ResultBuyPriceLineDiagram> GetListProductBuyPrice([FromQuery] BuyPriceChangeInARangeQuery query)
    {
        return await Mediator.Send(query);
    }
    [HttpGet]
    public async Task<ResultSoldLineDiagram> GetListProductNSold([FromQuery] NumberSoldInARangeQuery query)
    {
        return await Mediator.Send(query);
    }
}