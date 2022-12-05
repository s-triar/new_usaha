using Microsoft.AspNetCore.Identity;

namespace new_usaha.Infrastructure.Identity
{
    public class ApplicationUser : IdentityUser
    {
        public string? Fullname { get; set; }
    }
}