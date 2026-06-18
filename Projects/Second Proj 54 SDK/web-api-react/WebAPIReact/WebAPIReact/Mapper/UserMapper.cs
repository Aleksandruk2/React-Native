using Riok.Mapperly.Abstractions;
using WebAPIReact.Entities.Identity;
using WebAPIReact.Model.Account;
using WebAPIReact.Model.Seeder;

namespace WebAPIReact.Mapper;

[Mapper]
public partial class UserMapper
{
    [MapProperty(nameof(UserSeederModel.Email), nameof(UserEntity.UserName))]
    public partial UserEntity UserSeederToUser(UserSeederModel model);


    [MapProperty(nameof(RegisterModel.Email), nameof(UserEntity.UserName))]
    public partial UserEntity RegisterModelToUser(RegisterModel model);


    [MapProperty(nameof(EditProfileModel.Email), nameof(UserEntity.UserName))]
    public partial UserEntity EditModelToUser(EditProfileModel model);


    [MapPropertyFromSource(nameof(ProfileModel.DateCreated), Use = nameof(DateTimeToString))]
    [MapPropertyFromSource(nameof(ProfileModel.FullName), Use = nameof(GetFullName))]
    public partial ProfileModel UserToMeModel(UserEntity user);


    private static string GetFullName(UserEntity user)
        => $"{user.FirstName} {user.LastName}".Trim();


    private static string DateTimeToString(UserEntity user)
        => user.DateCreated.ToString("dd.MM.yyyy HH:mm:ss");

}
