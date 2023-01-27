using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using new_usaha.Infrastructure.TokenValidator;
using new_usaha.Application.Common.Models;
using new_usaha.Application.CQRS.Orders;
using new_usaha.Application.CQRS.Orders.Commands.CreateOrders;
using new_usaha.Application.CQRS.Orders.Queries;
using new_usaha.WebUI.Controllers;

namespace new_usaha.WebUI.Controllers;

[Authorize]
public class OrderController : ApiControllerBase
{
    [HttpPost]
    public async Task<Guid> CreateOrderOnline()
    {
        return new Guid("dadada");
    }
    [HttpPost]
    public async Task<Guid> FinishOrder()
    {
        return new Guid("dadada");
    }
    [HttpPost]
    public async Task<CreateOrderCashierCommandResponse> CreateOrderCashier([FromForm] CreateOrderCashierCommand command)
    {
        return await Mediator.Send(command);
    }
    [EnterpriseAuthorize("Dashboard", "Order", "Read")]
    [HttpGet]
    public async Task<SearchPageResponse<OrderDto>> GetEnterpriseOrder([FromQuery] GetOrderEnterpriseQuery query)
    {
        return await Mediator.Send(query);
    }
    [EnterpriseAuthorize("Dashboard", "Order", "Read")]
    [HttpGet]
    public async Task<DetailOrderDto> GetEnterpriseOrderDetail([FromQuery] GetDetailOrderEnterpriseQuery query)
    {
        return await Mediator.Send(query);
    }

}
