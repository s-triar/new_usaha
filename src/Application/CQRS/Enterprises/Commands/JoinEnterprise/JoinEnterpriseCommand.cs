using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using new_usaha.Application.Common.Models;

namespace new_usaha.Application.CQRS.Enterprises.Commands.JoinEnterprise;

public class JoinEnterpriseCommand: IRequest<Result>
{
    public int Code { get; set; }
}
public class JoinEnterpriseCommandHandler : IRequestHandler<JoinEnterpriseCommand, Result>
{
    public async Task<Result> Handle(JoinEnterpriseCommand request, CancellationToken cancellationToken)
    {
        var i = new String [1] ;
        i.Append("Not Implemented");
        return await Task.FromResult(Result.Failure(i));
    }
}
