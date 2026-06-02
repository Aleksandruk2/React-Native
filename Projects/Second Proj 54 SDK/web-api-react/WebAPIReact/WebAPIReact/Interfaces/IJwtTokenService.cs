using WebAPIReact.Entities.Identity;

namespace WebAPIReact.Interfaces;

public interface IJwtTokenService
{
    Task<string> CreateTokenAsync(UserEntity user);
}

