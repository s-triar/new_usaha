using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using new_usaha.Application.Common.Interfaces;

namespace new_usaha.Application.CQRS.Goodses.Queries.CheckDuplicateBarcode;

public class CheckDuplicateBarcodeQuery : IRequest<bool>
{
    public string Barcode { get; set; } 
}
public class CheckDuplicateBarcodeQueryHandler : IRequestHandler<CheckDuplicateBarcodeQuery, bool>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentEnterpriseService _currentEnterprise;

    public CheckDuplicateBarcodeQueryHandler(IApplicationDbContext context, ICurrentEnterpriseService currentEnterprise)
    {
        _context = context;
        this._currentEnterprise = currentEnterprise;
    }
    public async Task<bool> Handle(CheckDuplicateBarcodeQuery request, CancellationToken cancellationToken)
    {
        var entity = await _context.Goodses
                                .Where(x => x.EnterpriseId.ToString() == this._currentEnterprise.EnterpriseId)
                                .Where(x => x.Barcode.ToLower() == request.Barcode.Trim().ToLower())
                                .SingleOrDefaultAsync(cancellationToken);
        return entity != null;
    }
}
