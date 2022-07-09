using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using new_usaha.Infrastructure.Identity;

namespace new_usaha.Infrastructure.Persistence;
public class AuthDbContext: IdentityDbContext<ApplicationUser, IdentityRole<Guid>, Guid>
{
    public AuthDbContext(
       DbContextOptions<AuthDbContext> options
    )
       : base(options)
    {
        
    }
}
