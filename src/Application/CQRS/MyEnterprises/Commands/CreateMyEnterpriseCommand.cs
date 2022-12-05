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

public class CreateMyEnterpriseCommand: IRequest<ResultWithMessage>
{
    public string Code { get; set; }
    public string Name { get; set; }
    public string? Description { get; set; }
    public string? Photo { get; set; }
    public string Phone { get; set; }
    public string Email { get; set; }
    public int EnterpriseTypeId { get; set; }
    public IFormCollection? PhotoFile { get; set; }


    public string Street { get; set; }
    public string SubDistrict { get; set; }
    public string District { get; set; }
    public string City { get; set; }
    public string Province { get; set; }
    public string PostalCode { get; set; }
    public decimal Latitude { get; set; }
    public decimal Longitude { get; set; }

}
public class CreateMyEnterpriseCommandHandler : IRequestHandler<CreateMyEnterpriseCommand, ResultWithMessage>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserService _cs;

    public CreateMyEnterpriseCommandHandler(IApplicationDbContext context, ICurrentUserService cs)
    {
        _context = context;
        _cs = cs;
    }

    public async Task<ResultWithMessage> Handle(CreateMyEnterpriseCommand request, CancellationToken cancellationToken)
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
            Street = request.Street,
            SubDistrict = request.SubDistrict,
            District = request.District,
            City = request.City,
            Province = request.Province,
            PostalCode = request.PostalCode,
            EnterpriseId = entity.Id,
            Latitude = request.Latitude,
            Longitude = request.Longitude
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
        return new ResultWithMessage(true, new List<string> { }, "Berhasil membuat usaha baru");
    }

}