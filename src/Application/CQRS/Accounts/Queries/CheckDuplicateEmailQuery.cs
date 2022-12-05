using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using new_usaha.Application.Common.Interfaces;

namespace new_usaha.Application.CQRS.Accounts.Queries;
public class CheckDuplicateEmailQuery:IRequest<bool>
{
    public string Email { get; set; }
}

public class CheckDuplicateEmailQueryHandler : IRequestHandler<CheckDuplicateEmailQuery, bool>
{
    private readonly IIdentityService _ids;

    public CheckDuplicateEmailQueryHandler(
        IIdentityService ids
        )
    {
        _ids = ids;
    }
    public async Task<bool> Handle(CheckDuplicateEmailQuery request, CancellationToken cancellationToken)
    {
        return await _ids.CheckExistByEmail(request.Email);
    }
}
