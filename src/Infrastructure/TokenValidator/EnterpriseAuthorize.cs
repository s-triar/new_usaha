using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using new_usaha.Application.Common.Interfaces;
using new_usaha.Application.CQRS.Enterprises.Queries;

namespace new_usaha.Infrastructure.TokenValidator;

public class EnterpriseAuthorizeClaim
{
    public string Context { get; set; }  // e.g Admin, Workspace
    public string Feature { get; set; }  // e.g Employee, Cashier
    public string Action { get; set; }  // e.g Edit, Create
}
public class EnterpriseAuthorize : TypeFilterAttribute
{
    public EnterpriseAuthorize(string ctx, string ftr, string act) : base(typeof(EnterpriseClaimFilter))
    {
        //Arguments = new object[] { new Claim(claimType, claimValue) };
        Arguments = new object[] { new EnterpriseAuthorizeClaim { Action = act, Context = ctx, Feature = ftr } };
    }
}

public class EnterpriseClaimFilter : IAuthorizationFilter
{
    readonly EnterpriseAuthorizeClaim _claim;
    private readonly IApplicationDbContext context;
    private readonly IConfiguration configuration;
    private readonly ICurrentUserService currentUser;
    private readonly ICurrentEnterpriseService currentEnterprise;

    public EnterpriseClaimFilter(EnterpriseAuthorizeClaim claim, IApplicationDbContext context, IConfiguration configuration, ICurrentUserService currentUser, ICurrentEnterpriseService currentEnterprise)
    {
        _claim = claim;
        this.context = context;
        this.configuration = configuration;
        this.currentUser = currentUser;
        this.currentEnterprise = currentEnterprise;
    }

    public void OnAuthorization(AuthorizationFilterContext context)
    {
        var token = context.HttpContext.Request.Headers.FirstOrDefault(x => x.Key == "enterprise-authorization").Value;
        if (!string.IsNullOrEmpty(token))
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            try
            {
                var secret = this.configuration.GetValue<string>("EnterpriseSecret");
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secret)),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    // set clockskew to zero so tokens expire exactly at token expiration time (instead of 5 minutes later)
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);
                var tokenS = validatedToken as JwtSecurityToken;
                //var now = DateTime.Now;
                //if (tokenS.ValidTo < now)
                //{
                //    context.Result = new ForbidResult();
                //}
                var userId = tokenS.Claims.First(claim => claim.Type == EnteerpriseClaimType.UserId).Value;
                if (userId != this.currentUser.UserId)
                {
                    throw new Exception();
                }
                var enterpriseId = tokenS.Claims.First(claim => claim.Type == EnteerpriseClaimType.EnterpriseId).Value;
                var roleId = tokenS.Claims.First(claim => claim.Type == EnteerpriseClaimType.RoleId).Value;
                var enterprise = this.context.Enterprises.FirstOrDefault(x => x.Id.ToString() == enterpriseId);
                if (roleId != EnteerpriseClaimValueDefault.RoleOwner)
                {
                    var claim = this.context.EnterpriseRoleClaims
                                     .Include(x => x.EnterpriseClaim)
                                     .Where(x => x.EnterpriseRoleId.ToString() == roleId)
                                     .Where(x => x.EnterpriseClaim.EnterpriseTypeId == enterprise!.EnterpriseTypeId &&
                                                 x.EnterpriseClaim.Context == this._claim.Context &&
                                                 x.EnterpriseClaim.Feature == this._claim.Feature &&
                                                 x.EnterpriseClaim.Action == this._claim.Action
                                            ).FirstOrDefault();
                    if (claim == null)
                    {
                        throw new Exception();
                    }
                }
            }
            catch
            {
                context.Result = new ForbidResult();
            }
        }
        else
        {
            context.Result = new ForbidResult();

        }

    }
}
