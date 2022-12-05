using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using new_usaha.Application.Common.Interfaces;

namespace new_usaha.Application.CQRS.MyGoodses.Commands;

public class GoodsValidator<T> : AbstractValidator<T>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentEnterpriseService _currentEnterprise;

    public GoodsValidator(IApplicationDbContext context, ICurrentEnterpriseService currentEnterprise)
    {
        _context = context;
        _currentEnterprise = currentEnterprise;
    }
    public async Task<bool> CheckId(Guid Id, CancellationToken cancellationToken)
    {
        return await _context.Goodses
            .AnyAsync(l => l.Id == Id && l.EnterpriseId.ToString() == _currentEnterprise.EnterpriseId);
    }
    public async Task<bool> BeExistBarcode(string Barcode, CancellationToken cancellationToken)
    {
        return !string.IsNullOrEmpty(Barcode);
    }
    public async Task<bool> BeExistGroup(List<string>? Groups, CancellationToken cancellationToken)
    {
        if (Groups == null || Groups.Count() == 0) return true;
        var c = await _context.GoodsGroups
            .CountAsync(l => l.EnterpriseId.ToString() == _currentEnterprise.EnterpriseId && Groups.Contains(l.Id.ToString()));
        return c == Groups.Count();
    }
    public async Task<bool> BeExistParentBarcode(string ParentBarcode, string SelfBarcode, CancellationToken cancellationToken)
    {
        if (string.IsNullOrEmpty(ParentBarcode))
        {
            return true;
        }
        return await _context.Goodses
            .AnyAsync(l => l.EnterpriseId.ToString() == _currentEnterprise.EnterpriseId && ParentBarcode == l.Barcode && SelfBarcode != l.Barcode);
    }
    public async Task<bool> BeUniqueBarcode(string Barcode, CancellationToken cancellationToken)
    {
        return !await _context.Goodses
            .AnyAsync(l => l.EnterpriseId.ToString() == _currentEnterprise.EnterpriseId && Barcode == l.Barcode);
    }
    public async Task<bool> BeExistGoodsType(int GoodsTypeId, CancellationToken cancellationToken)
    {
        return await _context.GoodsTypes
            .AnyAsync(l => l.Id == GoodsTypeId);
    }
    public bool FileMustBeImage(string contentType)
    {
        return string.IsNullOrWhiteSpace(contentType) || !string.IsNullOrWhiteSpace(contentType) && (contentType.Equals("image/jpeg") || contentType.Equals("image/jpg") || contentType.Equals("image/png"));
    }
    public bool FileMaxSize(double? lengthFile, int maxLength = 250000)
    {
        return lengthFile == null || lengthFile <= maxLength;
    }
}
