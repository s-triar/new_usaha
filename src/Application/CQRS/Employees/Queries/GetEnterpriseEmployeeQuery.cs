using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using new_usaha.Application.Common.Models;

namespace new_usaha.Application.CQRS.Employees.Queries;

public class GetEnterpriseEmployeeQuery : IRequest<EnterpriseEmployeeDto>
{
}
public class GetEnterpriseEmployeeQueryHandler : IRequestHandler<GetEnterpriseEmployeeQuery, EnterpriseEmployeeDto>
{

    public Task<EnterpriseEmployeeDto> Handle(GetEnterpriseEmployeeQuery request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}
