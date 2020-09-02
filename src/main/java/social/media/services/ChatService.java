package social.media.services;

import social.media.model.*;

import javax.enterprise.context.ApplicationScoped;
import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;
import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;


@ServerEndpoint("/chat/{userName}")
@ApplicationScoped
public class ChatService {

    Map<String, Session> sessions = new ConcurrentHashMap<>();

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

        final JsonMessage jsonMessage = JsonbBuilder.create().fromJson(message, JsonMessage.class);
        final String messageContent = jsonMessage.getContent();
        final String receiverName = jsonMessage.getReceiverName();
        final User sender = User.getUserByName(senderName);
        final User receiver = User.getUserByName(receiverName);
        final Chat chat = Chat.getChatByParticipants(sender, receiver);
        final Integer chatId = senderName.hashCode() + receiverName.hashCode();
        chat.getMessages().add(new Message(sender, receiver, messageContent));
        ChatResource.chats.put(chatId, chat);
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
}

