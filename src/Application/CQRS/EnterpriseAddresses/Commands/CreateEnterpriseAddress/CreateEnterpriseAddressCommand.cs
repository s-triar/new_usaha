using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using new_usaha.Application.Common.Interfaces;
using new_usaha.Application.Common.Mappings;
using new_usaha.Domain.Entities;

namespace new_usaha.Application.EnterpriseAddresses.Commands.CreateEnterpriseAddress;

public class CreateEnterpriseAddressCommand : EnterpriseAddressDto, IRequest<Guid>
{
    //public Guid EnterpriseId { get; set; }
}
public class CreateEnterpriseCommandHandler : IRequestHandler<CreateEnterpriseAddressCommand, Guid>
{
    private readonly IApplicationDbContext _context;


    public CreateEnterpriseCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Guid> Handle(CreateEnterpriseAddressCommand request, CancellationToken cancellationToken)
    {

        var entity = new EnterpriseAddress
        {
            Street = request.Street,
            SubDistrict = request.SubDistrict,
            District = request.District,
            City = request.City,
            Province = request.Province,
            PostalCode = request.PostalCode,
            EnterpriseId = request.EnterpriseId
        };

        _context.EnterpriseAddresses.Add(entity);


        await _context.SaveChangesAsync(cancellationToken);

        return entity.Id;
    }
}
