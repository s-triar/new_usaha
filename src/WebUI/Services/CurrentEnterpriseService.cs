using System.IdentityModel.Tokens.Jwt;
using new_usaha.Application.Common.Interfaces;
using new_usaha.Application.CQRS.Enterprises.Queries;

namespace new_usaha.WebUI.Services;

public class CurrentEnterpriseService : ICurrentEnterpriseService
{
    private IHttpContextAccessor _httpContextAccessor;
    private IHttpClientFactory _httpClientFactory;
    public CurrentEnterpriseService(IHttpContextAccessor httpContextAccessor, IHttpClientFactory httpClientFactory)
    {
        this._httpContextAccessor = httpContextAccessor;
        this._httpClientFactory = httpClientFactory;
        this.getUserInfo();
    }

    private async Task getUserInfo()
    {

        if (_httpContextAccessor != null && _httpContextAccessor.HttpContext != null)
        {
            var accessToken = _httpContextAccessor.HttpContext.Request.Headers.FirstOrDefault(x => x.Key == "enterprise-authorization").Value;
            if (!string.IsNullOrEmpty(accessToken))
            {
                var handler = new JwtSecurityTokenHandler();
                var tokenS = handler.ReadToken(accessToken) as JwtSecurityToken;
                this.UserId = tokenS.Claims.First(claim => claim.Type == EnteerpriseClaimType.UserId).Value;
                this.EnterpriseId = tokenS.Claims.First(claim => claim.Type == EnteerpriseClaimType.EnterpriseId).Value;
                this.RoleId = tokenS.Claims.First(claim => claim.Type == EnteerpriseClaimType.RoleId).Value;
            }
        }

    }
    public string UserId { get; private set; }

    public string EnterpriseId { get; private set; }

    public string RoleId { get; private set; }
}