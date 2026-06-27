namespace WebAPIReact.Model.Chat;

public class ChatEditModel
{
    public long Id { get; set; }
    public string? Name { get; set; }
    public List<long>? AddUserIds { get; set; }
    public List<long>? RemoveUserIds { get; set; }
}

