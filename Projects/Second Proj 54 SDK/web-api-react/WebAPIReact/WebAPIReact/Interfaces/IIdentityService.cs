namespace WebAPIReact.Interfaces;

public interface IIdentityService
{
    Task<long> GetUserIdAsync();
}
