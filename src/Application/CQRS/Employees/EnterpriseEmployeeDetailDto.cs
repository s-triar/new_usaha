using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using new_usaha.Application.Common.Mappings;
using new_usaha.Domain.Entities;

namespace new_usaha.Application.CQRS.Employees;

public class EnterpriseEmployeeDetailDto
{
    public string UserId { get; set; } 
    public string EmployeeId { get; set; } 
    public string Email { get; set; } 
    public string Name { get; set; }
    public string EnterpriseRoleName { get; set; }
    
}
