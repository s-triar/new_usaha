using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using new_usaha.Application.Common.Models;
using new_usaha.Application.CQRS.GoodsGroups;
using new_usaha.Application.CQRS.GoodsGroups.Commands.CreateGoodsGroup;
using new_usaha.Application.CQRS.GoodsGroups.Queries.CheckDuplicateGoodsGroupName;
using new_usaha.Application.CQRS.GoodsGroups.Queries.GetMyGoodsGroup;

namespace new_usaha.WebUI.Controllers;
[Authorize]
public class GoodsGroupController : ApiControllerBase
{
    [HttpGet]
    public async Task<bool> CheckDuplicateGoodsGroupName([FromQuery] CheckDuplicateGoodsGroupNameQuery query)
    {
        return (bool)await Mediator.Send(query);
    }
    [HttpGet]
    public async Task<SearchPageResponse<MyGoodsGroupDto>> GetMyGoodsGroups([FromQuery] GetMyGoodsGroupQuery query)
    {
        return await Mediator.Send(query);
    }
    [HttpPost]
    public async Task<Guid> Create([FromForm] CreateGoodsGroupCommand command)
    {
        return await Mediator.Send(command);
    }
}
