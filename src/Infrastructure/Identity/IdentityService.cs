using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using new_usaha.Application.Common.Interfaces;
using new_usaha.Application.Common.Models;

namespace new_usaha.Infrastructure.Identity
{
    public class IdentityService : IIdentityService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IUserClaimsPrincipalFactory<ApplicationUser> _userClaimsPrincipalFactory;
        private readonly IAuthorizationService _authorizationService;
        private readonly SignInManager<ApplicationUser> _signManager;
        private readonly IConfiguration _config;

        public IdentityService(
            UserManager<ApplicationUser> userManager,
            IUserClaimsPrincipalFactory<ApplicationUser> userClaimsPrincipalFactory,
            IAuthorizationService authorizationService,
            SignInManager<ApplicationUser> signManager,
            IConfiguration config
            )
        {
            _userManager = userManager;
            _userClaimsPrincipalFactory = userClaimsPrincipalFactory;
            _authorizationService = authorizationService;
            _signManager = signManager;
            _config = config;
        }

        public async Task<string> GetUserNameAsync(string userId)
        {
            var user = await _userManager.Users.FirstAsync(u => u.Id == userId);

            return user.UserName;
        }

        public async Task<bool> CheckExistByEmail(string Email)
        {
            return await _userManager.Users.AnyAsync(u => u.NormalizedEmail == Email.ToUpper());
        }

        public async Task<bool> CheckExistByPhone(string Phone)
        {
            return await _userManager.Users.AnyAsync(u => u.PhoneNumber == Phone.ToUpper());
        }

        public async Task<(Result Result, string UserId)> CreateUserAsync(string fullname, string email, string phone, string password)
        {
            var user = new ApplicationUser
            {
                UserName = email,
                Email = email,
                PhoneNumber = phone,
                Fullname = fullname
            };

            var result = await _userManager.CreateAsync(user, password);

            return (result.ToApplicationResult(), user.Id.ToString());
        }

        public async Task<bool> IsInRoleAsync(string userId, string role)
        {
            var user = _userManager.Users.SingleOrDefault(u => u.Id == userId);

            return user != null && await _userManager.IsInRoleAsync(user, role);
        }

        public async Task<bool> AuthorizeAsync(string userId, string policyName)
        {
            var user = _userManager.Users.SingleOrDefault(u => u.Id == userId);

            if (user == null)
            {
                return false;
            }

            var principal = await _userClaimsPrincipalFactory.CreateAsync(user);

            var result = await _authorizationService.AuthorizeAsync(principal, policyName);

            return result.Succeeded;
        }

        public async Task<Result> DeleteUserAsync(string userId)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(u => u.Id == userId);

            return user != null ? await DeleteUserAsync(userId) : Result.Success();
        }

        public async Task<Result> DeleteUserAsync(ApplicationUser user)
        {
            var result = await _userManager.DeleteAsync(user);

            return result.ToApplicationResult();
        }
        public async Task<UserMinimalInfo> GetMinimalInfoUserByEmailAsync(string email)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(u => u.Email.ToLower() == email.ToLower());
            
            return user==null? null:  new UserMinimalInfo
            {
                Email = user?.Email,
                Id = user?.Id.ToString(),
                Name = user?.UserName
            };
        }

        public async Task<UserMinimalInfo> GetMinimalInfoUserByIdAsync(string userId)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(u => u.Id == userId);

            return user == null? null : new UserMinimalInfo
            {
                Email = user?.Email,
                Id = user?.Id.ToString(),
                Name = user?.UserName
            };
        }


        public async Task<ResultUserLogin> SignInWithEmailAndPasword(string email, string password)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                string Message = "Pengguna tidak ditemukan";
                return new ResultUserLogin(false,new List<string>() { }, Message, null);
            }
            var result = await _signManager.CheckPasswordSignInAsync(user, password, false);
            if (result.IsNotAllowed)
            {
                string Message = "Akun belum aktif";
                return new ResultUserLogin(false, new List<string>() { }, Message, null);
            }
            if (!result.Succeeded)
            {
                string Message = "Password salah";
                return new ResultUserLogin(false, new List<string>() { }, Message, null);
            }
            else
            {
                var claims = new Claim[]
                {
                        new Claim(JwtRegisteredClaimNames.Sub,user.Id.ToString()),
                        new Claim(JwtRegisteredClaimNames.Email, user.Email),
                        //new Claim(JwtRegisteredClaimNames.GivenName, user.Name),

                };
                var secret = _config["JwtSettings:SymKey"];
                var secretByte = Encoding.UTF8.GetBytes(secret);
                var key = new SymmetricSecurityKey(secretByte);
                var algorithm = SecurityAlgorithms.HmacSha256;
                var signinCredentials = new SigningCredentials(key, algorithm);
                var token = new JwtSecurityToken(null, null, claims, DateTime.Now, DateTime.Now.AddHours(24), signinCredentials);
                var tokenJson = new JwtSecurityTokenHandler().WriteToken(token);
                string Message = "Berhasil masuk";
                string Token = tokenJson;
                return new ResultUserLogin(true, new List<string>() { }, Message, Token);

            }
        }

    }
}