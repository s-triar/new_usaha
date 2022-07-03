using new_usaha.Application.Common.Models;

namespace new_usaha.Application.Common.Interfaces
{
    public class UserMinimalInfo
    {
        public string? Id { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
    }
    public interface IIdentityService
    {
        Task<UserMinimalInfo> GetMinimalInfoUserByEmailAsync(string email);
        Task<UserMinimalInfo> GetMinimalInfoUserByIdAsync(string userId);
        Task<string> GetUserNameAsync(string userId);
        Task<bool> CheckExistByEmail(string Email);

        Task<bool> IsInRoleAsync(string userId, string role);

        Task<bool> AuthorizeAsync(string userId, string policyName);

        Task<(Result Result, string UserId)> CreateUserAsync(string userName, string password);

        Task<Result> DeleteUserAsync(string userId);
    }
}