package social.media;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class Chat {

    private User user1;
    private User user2;
    private Integer chatId;

    private ArrayList<Message> messages = new ArrayList<>();

    public Chat(User user1, User user2){
        this.user1 = user1;
        this.user2 = user2;
        chatId = user1.getName().hashCode() + user2.getName().hashCode();
    }

    public ArrayList<User> getUsers() {
        ArrayList<User> users =  new ArrayList<>();
        users.add(user1);
        users.add(user2);
        return users;
    }

    public Integer getChatId(){
        return chatId;
    }

    public ArrayList<Message> getMessages() {
        return messages;
    }

    public static Chat getChatByParticipants(List<Chat> chats, User user1, User user2) {
        Integer chatId = user1.getName().hashCode() + user2.getName().hashCode();
        for(Chat chat : chats)
            if (chat.getChatId() == chatId) {
                return chat;
            }
        return new Chat(user1, user2);
    }

}
