using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace new_usaha.Application.Common.Interfaces;

public interface ICurrentEnterpriseService
{
    string? UserId { get; }
    string? EnterpriseId { get; }
    string? RoleId { get; }
}
