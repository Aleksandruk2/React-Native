using Microsoft.AspNetCore.Identity;

namespace WebApiReact.Entities.Identity;

public class RoleEntity : IdentityRole<long>
{
    public ICollection<UserRoleEntity>? UserRoles { get; set; } = new List<UserRoleEntity>();
    public RoleEntity() : base() { }

    public RoleEntity(string roleName) : base(roleName) { }
}

