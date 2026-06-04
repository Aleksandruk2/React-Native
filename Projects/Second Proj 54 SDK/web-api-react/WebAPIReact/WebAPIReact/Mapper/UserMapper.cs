using Riok.Mapperly.Abstractions;
using WebAPIReact.Entities.Identity;
using WebAPIReact.Model.Seeder;

namespace WebAPIReact.Mapper;

[Mapper]
public partial class UserMapper
{
    [MapProperty(nameof(UserSeederModel.Email), nameof(UserEntity.UserName))]
    public partial UserEntity UserSeederToUser(UserSeederModel model);
}
