using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
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
    public async Task<string> GetTemplateHtmlAsStringAsync<T>(
                string path_template, T model)
    {
        
        StreamReader str = new StreamReader(path_template);

        string mailText = str.ReadToEnd();

        str.Close();
        foreach (var prop in typeof(T).GetProperties())
        {
            var code = "@@" + prop.Name;
            string propValue = this.GetPropertyValue(model, prop.Name).ToString();
            mailText = mailText.Replace(code, propValue);
        }

        return mailText;

    }
    private object GetPropertyValue(object source, string propertyName)
    {
        PropertyInfo property = source.GetType().GetProperty(propertyName);
        return property.GetValue(source, null);
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

    public async Task SendUserRegisterSuccessActiationAsync(string to, string name, string url)
    {
        string path = _env + EmailTemplatePath.ACCOUNT_REGISTER_SUCCESS_ACTIVATION;
        var builder = new BodyBuilder();
        using (StreamReader SourceReader = System.IO.File.OpenText(path))
        {

            builder.HtmlBody = SourceReader.ReadToEnd();

        }
        string msg = string.Format(builder.HtmlBody,
                        name,
                        url
                        );
        await _sender.SendEmailAsync(to, "Anda direkrut.", msg);
    }

    public async Task SendUserForgetPasswordOTPAsync(string to, UserOtpModel model)
    {
        string path = _env + EmailTemplatePath.USER_FORGET_PASSWORD_OTP;
        var htmlTemplate = await this.GetTemplateHtmlAsStringAsync<UserOtpModel>(path, model);
        await _sender.SendEmailAsync(to, "Anda direkrut.", htmlTemplate);
    }
}

public class UserOtpModel
{
    public string Name { get; set; }
    public string Email { get; set; }
    public string Otp { get; set; }
}