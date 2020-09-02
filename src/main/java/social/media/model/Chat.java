package social.media.model;

import java.util.ArrayList;

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

    public static Integer getChatId(User user1, User user2) {
        return user1.getName().hashCode() + user2.getName().hashCode();
    }

    public static Chat getChatByParticipants(User user1, User user2) {
        Integer chatId = getChatId(user1, user2);
        if (ChatResource.chats.containsKey(chatId)){
            return ChatResource.chats.get(chatId);
        }
        return new Chat(user1, user2);
    }

}
