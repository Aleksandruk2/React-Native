using Microsoft.AspNetCore.Mvc;

namespace WebAPIReact.Model.Account;

public class EditProfileModel
{
    /// <summary>
    /// Ім'я користувача
    /// </summary>
    /// <example>Адмін</example>
    public string FirstName { get; set; } = string.Empty;

    /// <summary>
    /// Прізвище користувача
    /// </summary>
    /// <example>Системний</example>
    public string LastName { get; set; } = string.Empty;

    /// <summary>
    /// Електронна пошта користувача
    /// </summary>
    /// <example>admin@example.com</example>
    public string Email { get; set; } = string.Empty;

    [FromForm]
    public IFormFile? ImageFile { get; set; } = null;
}
