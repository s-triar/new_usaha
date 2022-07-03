﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using new_usaha.Application.Common.Mappings;
using new_usaha.Domain.Entities;

namespace new_usaha.Application.EnterpriseAddresses;

public class EnterpriseAddressDto : IMapFrom<EnterpriseAddress>
{
    public Guid Id { get; set; }
    public Guid EnterpriseId { get; set; }
    public string Street { get; set; } 
    public string SubDistrict { get; set; } 
    public string District { get; set; } 
    public string City { get; set; } 
    public string Province { get; set; } 
    public string PostalCode { get; set; } 
    public decimal Latitude { get; set; }
    public decimal Longitude { get; set; }
}
