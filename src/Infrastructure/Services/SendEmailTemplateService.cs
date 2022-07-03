using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity.UI.Services;
using MimeKit;
using new_usaha.Application.Common.Constants;
using new_usaha.Application.Common.Interfaces;

namespace new_usaha.Infrastructure.Services;

public class SendEmailTemplateService : ISendEmailTemplateService
{
    private IHostingEnvironment _env;
    private IEmailSender _sender;
    public SendEmailTemplateService(IHostingEnvironment env, IEmailSender sender)
    {
        _env = env;
        _sender = sender;
    }

    public async Task SendEmployeeFiredAsync(string to, string usahaName)
    {
        string path = _env + EmailTemplatePath.EMPLOYEE_FIRED_TEMPLATE;
        var builder = new BodyBuilder();
        using (StreamReader SourceReader = System.IO.File.OpenText(path))
        {

            builder.HtmlBody = SourceReader.ReadToEnd();

        }
        string msg = string.Format(builder.HtmlBody,
                        usahaName
                        );
        await _sender.SendEmailAsync(to, "Anda dipecat.", msg);
    }

    public async Task SendEmployeeHiredAsync(string to, string usahaName, string code, DateTime expiredTime)
    {
        string path = _env + EmailTemplatePath.EMPLOYEE_HIRED_TEMPLATE;
        var builder = new BodyBuilder();
        using (StreamReader SourceReader = System.IO.File.OpenText(path))
        {

            builder.HtmlBody = SourceReader.ReadToEnd();
            
        }
        string msg =  string.Format(builder.HtmlBody,
                        usahaName,
                        code,
                        String.Format("{d MMMM yyyy, hh:mm:ss}", expiredTime)
                        );
        await _sender.SendEmailAsync(to, "Anda direkrut.", msg);
    }
}
