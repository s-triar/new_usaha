using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using new_usaha.Application.Common.Interfaces;

namespace new_usaha.Application.CQRS.Accounts.Queries;
public class CheckDuplicatePhoneQuery: IRequest<bool>
{
    public string Phone { get; set; }
}


public class CheckDuplicatePhoneQueryHandler : IRequestHandler<CheckDuplicatePhoneQuery, bool>
{
    private readonly IIdentityService _ids;

    public CheckDuplicatePhoneQueryHandler(
        IIdentityService ids
        )
    {
        _ids = ids;
    }
    public async Task<bool> Handle(CheckDuplicatePhoneQuery request, CancellationToken cancellationToken)
    {
        return await _ids.CheckExistByPhone(request.Phone);
    }
}
