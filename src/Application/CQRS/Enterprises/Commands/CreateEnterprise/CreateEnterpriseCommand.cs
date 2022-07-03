using MediatR;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using new_usaha.Application.Common.Constants;
using new_usaha.Application.Common.Interfaces;
using new_usaha.Application.EnterpriseAddresses.Commands.CreateEnterpriseAddress;
using new_usaha.Domain.Entities;


namespace new_usaha.Application.Enterprises.Commands.CreateEnterprise;

public class CreateEnterpriseCommand : EnterpriseDto, IRequest<Guid>
{
    public int EnterpriseTypeId { get; set; }
    public IFormCollection? PhotoFile { get; set; }
}
public class CreateEnterpriseCommandHandler : IRequestHandler<CreateEnterpriseCommand, Guid>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserService _cs;

    public CreateEnterpriseCommandHandler(IApplicationDbContext context, ICurrentUserService cs)
    {
        _context = context;
        _cs = cs;
    }

    public async Task<Guid> Handle(CreateEnterpriseCommand request, CancellationToken cancellationToken)
    {
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

            if (request.PhotoFile!.Files.Count() > 0)
            {
                var folderName = Path.Combine(ResourcesPath.RESOURCES, ResourcesPath.ENTERPRISE_FOLDER);
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                var file = request.PhotoFile.Files.First();
                var fileName = (Guid.NewGuid()).ToString().Substring(9, 16) + ((new DateTime()).Ticks).ToString() + request.Photo;
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
        return entity.Id;
    }

}
