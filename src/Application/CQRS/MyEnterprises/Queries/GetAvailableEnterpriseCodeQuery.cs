using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using new_usaha.Application.Common.Interfaces;
using new_usaha.Domain.Entities;

namespace new_usaha.Application.CQRS.MyEnterprises.Queries;

public class GetAvailableEnterpriseCodeQuery : IRequest<string[]>
{
    public string? Name { get; set; }
}
public class GetAvailableEnterpriseCodeQueryHandler : IRequestHandler<GetAvailableEnterpriseCodeQuery, string[]>
{
    private readonly IApplicationDbContext _context;
    public GetAvailableEnterpriseCodeQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }
    public async Task<string[]> Handle(GetAvailableEnterpriseCodeQuery request, CancellationToken cancellationToken)
    {
        int l = 3;
        request.Name = request.Name == null ? "" : request.Name;
        string Name = request.Name.Trim();
        Name = Name.Replace(" ", "");
        Random rnd = new Random();
        string[] Names = new string[l];
        for (int i = 0; i < l; i++)
        {
            Enterprise? check;
            do
            {
                int n = rnd.Next(1, 6);
                int digit = (int)Math.Pow(10, n);
                int r = rnd.Next(1, digit);
                string generateCode = Name + r.ToString();
                check = await _context.Enterprises.Where(c => c.Code == generateCode).SingleOrDefaultAsync(cancellationToken);
                if (check == null)
                {
                    if (Names.Contains(generateCode))
                    {
                        check = null;
                    }
                    else
                    {
                        Names[i] = generateCode;
                    }
                }
            } while (check != null);
        }
        return Names;
    }
}
