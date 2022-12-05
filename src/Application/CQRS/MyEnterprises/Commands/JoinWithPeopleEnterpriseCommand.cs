using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using new_usaha.Application.Common.Models;

namespace new_usaha.Application.CQRS.MyEnterprises.Commands;

public class JoinEnterpriseCommand : IRequest<ResultWithMessage>
{
    public int Code { get; set; }
}
public class JoinEnterpriseCommandHandler : IRequestHandler<JoinEnterpriseCommand, ResultWithMessage>
{
    public async Task<ResultWithMessage> Handle(JoinEnterpriseCommand request, CancellationToken cancellationToken)
    {
        var i = new string[1];
        i.Append("Not Implemented");
        return await Task.FromResult(new ResultWithMessage(false, i, "Bergabung dengan usaha gagal"));
    }
}
