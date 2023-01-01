using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Http;
using new_usaha.Application.Common.Constants;
using new_usaha.Application.Common.Interfaces;
using new_usaha.Application.Common.Models;
using new_usaha.Domain.Entities;

namespace new_usaha.Application.CQRS.MyEnterprises.Commands;

public class CreateEnterpriseAddressCommand
{
    public string Street { get; set; }
    public string SubDistrict { get; set; }
    public string District { get; set; }
    public string City { get; set; }
    public string Province { get; set; }
    public string PostalCode { get; set; }
    public decimal Latitude { get; set; }
    public decimal Longitude { get; set; }
}
public class CreateMyEnterpriseCommand: IRequest<Unit>
{
    public string Code { get; set; }
    public string Name { get; set; }
    public string? Description { get; set; }
    public string? Photo { get; set; }
    public string Phone { get; set; }
    public string Email { get; set; }
    public int EnterpriseTypeId { get; set; }
    public IFormCollection? PhotoFile { get; set; }


    public CreateEnterpriseAddressCommand Address { get; set; }

}
public class CreateMyEnterpriseCommandHandler : IRequestHandler<CreateMyEnterpriseCommand, Unit>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserService _cs;

    public CreateMyEnterpriseCommandHandler(IApplicationDbContext context, ICurrentUserService cs)
    {
        _context = context;
        _cs = cs;
    }

    public async Task<Unit> Handle(CreateMyEnterpriseCommand request, CancellationToken cancellationToken)
    {
        await this._context.BeginTransactionAsync();
        var entity = new Enterprise
        {
            UserOwnerId = _cs.UserId!,
            Description = request.Description,
            Name = request.Name,
            Code = request.Code.Trim(),
            EnterpriseTypeId = request.EnterpriseTypeId,
            Phone = request.Phone,
            Photo = request.Photo,
            Email = request.Email
        };

        _context.Enterprises.Add(entity);

        var entityAddresss = new EnterpriseAddress
        {
            Street = request.Address.Street,
            SubDistrict = request.Address.SubDistrict,
            District = request.Address.District,
            City = request.Address.City,
            Province = request.Address.Province,
            PostalCode = request.Address.PostalCode,
            EnterpriseId = entity.Id,
            Latitude = request.Address.Latitude,
            Longitude = request.Address.Longitude
        };
        _context.EnterpriseAddresses.Add(entityAddresss);

        try
        {
            foreach(var f in request.PhotoFile!.Files)
            {
                var folderName = Path.Combine(ResourcesPath.RESOURCES, ResourcesPath.ENTERPRISE_FOLDER);
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                var file = f;
                var fileName = string.Concat(Guid.NewGuid().ToString().AsSpan(9,16), ((new DateTime()).Ticks).ToString(), request.Photo); 
                var fullPath = Path.Combine(pathToSave, fileName);
                var dbPath = Path.Combine(folderName, fileName);
                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }
                entity.Photo = dbPath;
            }
            
        }
        catch (Exception ex)
        {

        }
        await _context.SaveChangesAsync(cancellationToken);
        this._context.CommitTransactionAsync();
        return Unit.Value;
        //return new ResultWithMessage(true, new List<string> { }, "Berhasil membuat usaha baru");
    }

}