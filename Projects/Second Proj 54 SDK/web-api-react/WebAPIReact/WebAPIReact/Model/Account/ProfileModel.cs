namespace WebAPIReact.Model.Account;

public class ProfileModel
{
    public long Id { get; set; }
    public String DateCreated { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? Image { get; set; } = string.Empty;
}
