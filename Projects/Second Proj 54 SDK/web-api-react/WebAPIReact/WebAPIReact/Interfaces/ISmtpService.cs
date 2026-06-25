namespace WebAPIReact.Interfaces;

using WebAPIReact.Smtp;

public interface ISmtpService
{
    Task<bool> SendEmailAsync(MyEmailMessage message);
}

