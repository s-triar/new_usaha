using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace new_usaha.Application.Common.Constants;

public static class EmailTemplatePath
{
    public readonly static string EMPLOYEE_HIRED_TEMPLATE = Path.DirectorySeparatorChar.ToString()
        + "Template"
        + Path.DirectorySeparatorChar.ToString()
        + "EmailTemplate"
        + Path.DirectorySeparatorChar.ToString()
        + "employee_hired.html";
    public readonly static string EMPLOYEE_FIRED_TEMPLATE = Path.DirectorySeparatorChar.ToString()
        + "Template"
        + Path.DirectorySeparatorChar.ToString()
        + "EmailTemplate"
        + Path.DirectorySeparatorChar.ToString()
        + "employee_fired.html";
}
