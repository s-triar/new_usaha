﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MailKit.Security;

namespace new_usaha.Infrastructure.Email;

public class EmailSenderOption
{
    public EmailSenderOption()
    {
        Host_SecureSocketOptions = SecureSocketOptions.Auto;
    }

    public string Host_Address { get; set; }

    public int Host_Port { get; set; }

    public string Host_Username { get; set; }

    public string Host_Password { get; set; }

    public SecureSocketOptions Host_SecureSocketOptions { get; set; }

    public string Sender_EMail { get; set; }

    public string Sender_Name { get; set; }
}