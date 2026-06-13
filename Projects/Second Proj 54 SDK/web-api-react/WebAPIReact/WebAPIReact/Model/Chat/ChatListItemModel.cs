namespace WebAPIReact.Model.Chat;

public class ChatListItemModel
{
    public long ChatId { get; set; }
    public string Name { get; set; } = null!;
    public long ChatTypeId { get; set; }
}

