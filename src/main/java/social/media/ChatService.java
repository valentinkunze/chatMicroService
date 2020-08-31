package social.media;

import javax.enterprise.context.ApplicationScoped;
import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;
import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.util.ArrayList;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;


@ServerEndpoint("/chat/{userName}")
@ApplicationScoped
public class ChatService {

    Map<String, Session> sessions = new ConcurrentHashMap<>();
    ArrayList<Chat> chats = new ArrayList<>();


    @OnOpen
    public void onOpen(Session session, @PathParam("userName") String senderName) {
        if(!UserResource.users.stream().anyMatch(user -> user.getName().equals(senderName))) {
            sessions.put(senderName, session);
            User user = new User(senderName);
            UserResource.users.add(user);
            notifyUsersWhenNewUserRegisters(user);
        }
    }

    @OnClose
    public void onClose(Session session, @PathParam("userName") String senderName) {
        sessions.remove(senderName);
        UserResource.users.removeIf(user -> !user.getName().equals(senderName));
    }

    @OnError
    public void onError(Session session, @PathParam("userName") String senderName, Throwable throwable) {
        sessions.remove(senderName);
        UserResource.users.removeIf(user -> !user.getName().equals(senderName));
    }

    @OnMessage
    public void onMessage(String message, @PathParam("userName") String senderName) {
//        if(!UserResource.users.stream().anyMatch(user -> user.getName() == senderName && user.getName().equals(receiverName))) {
//            throw new IllegalArgumentException();
//        }

        Jsonb jsonb = JsonbBuilder.create();
        JsonMessage jsonMessage = jsonb.fromJson(message, JsonMessage.class);
        String messageContent = jsonMessage.getContent();
        String receiverName = jsonMessage.getReceiverName();

        // TODO getUserByName(senderName)
        final User sender = User.getUserByName(UserResource.users, senderName);
        final User receiver = User.getUserByName(UserResource.users, receiverName);
        final Chat chat = Chat.getChatByParticipants(chats, sender, receiver);

        if(!chats.contains(chat)) {
            chats.add(chat);
        }
        chat.getMessages().add(new Message(sender, receiver, messageContent));

        sendMessage(receiver, message);
    }

    private void sendMessage(User receiver, String message) {
        sessions.get(receiver.getName())
                .getAsyncRemote()
                .sendObject(message, result -> {
                    if (result.getException() != null) {
                        System.out.println("Unable to send message: " + result.getException());
                    }
                });
    }

    private void notifyUsersWhenNewUserRegisters(User user) {
        final String message = "New User";
        sessions.values().stream()
                .filter(session -> session != sessions.get(user.getName()))
                .forEach(s -> {
                    s.getAsyncRemote().sendObject(message, result ->  {
                        if (result.getException() != null) {
                            System.out.println("Unable to send message: " + result.getException());
                        }
                    });
                });
    }

    // TODO persist message and send it to receiver

    private void broadcast(String message) {
        sessions.values().forEach(s -> {
            s.getAsyncRemote().sendObject(message, result ->  {
                if (result.getException() != null) {
                    System.out.println("Unable to send message: " + result.getException());
                }
            });
        });
    }
}

