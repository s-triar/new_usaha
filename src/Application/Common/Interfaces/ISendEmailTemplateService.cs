using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace new_usaha.Application.Common.Interfaces;

public interface ISendEmailTemplateService
{
    Task SendEmployeeHiredAsync(string to, string usahaName, string code, DateTime expiredTime);
    Task SendEmployeeFiredAsync(string to, string usahaName);
}
