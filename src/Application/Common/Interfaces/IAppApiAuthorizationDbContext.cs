using IdentityServer4.EntityFramework.Interfaces;

namespace new_usaha.Application.Common.Interfaces;

public interface IAppApiAuthorizationDbContext : IConfigurationDbContext, IPersistedGrantDbContext, IIdentityService
{
}
