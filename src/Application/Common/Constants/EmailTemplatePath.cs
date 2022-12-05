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

    public readonly static string ACCOUNT_REGISTER_SUCCESS_ACTIVATION = Path.DirectorySeparatorChar.ToString()
       + "Template"
       + Path.DirectorySeparatorChar.ToString()
       + "EmailTemplate"
       + Path.DirectorySeparatorChar.ToString()
       + "UerRegisterSuccess.html";

    public readonly static string USER_FORGET_PASSWORD_OTP = Path.DirectorySeparatorChar.ToString()
       + "Template"
       + Path.DirectorySeparatorChar.ToString()
       + "EmailTemplate"
       + Path.DirectorySeparatorChar.ToString()
       + "UserForgetPasswordOtp.html";
}
