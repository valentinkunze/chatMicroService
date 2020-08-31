package social.media;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import javax.enterprise.context.ApplicationScoped;
import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import javax.websocket.Session;
import javax.ws.rs.QueryParam;

//import javax.json.json


//@ServerEndpoint("/chat/{userName}/{receiverName}")
@ServerEndpoint("/chat/{userName}")
@ApplicationScoped
public class ChatService {

    Map<String, Session> sessions = new ConcurrentHashMap<>();
//    ArrayList<User> users = new ArrayList<>();
    ArrayList<Chat> chats = new ArrayList<>();


    @OnOpen
    public void onOpen(Session session, @PathParam("userName") String senderName) {
        if(!UserResource.users.stream().anyMatch(user -> user.getName().equals(senderName))) {
            sessions.put(senderName, session);
            User user = new User(senderName);
            UserResource.users.add(user);
            notifyUsersWhenNewUserRegisters(user);
        }
//        broadcast("User " + senderName + " joined");
    }

    @OnClose
    public void onClose(Session session, @PathParam("userName") String senderName) {
        sessions.remove(senderName);
        UserResource.users.removeIf(user -> !user.getName().equals(senderName));
//        broadcast("User " + senderName + " left");
    }

    @OnError
    public void onError(Session session, @PathParam("userName") String senderName, Throwable throwable) {
        sessions.remove(senderName);
        UserResource.users.removeIf(user -> !user.getName().equals(senderName));
//        broadcast("User " + senderName + " left on error: " + throwable);
    }

    // TODO pass sender in message such that server and receiver can know where it came from without having to have a seperate session for this chgat
    @OnMessage
    public void onMessage(String message, @PathParam("userName") String senderName) {
//        if(!UserResource.users.stream().anyMatch(user -> user.getName() == senderName && user.getName().equals(receiverName))) {
//            throw new IllegalArgumentException();
//        }

        Jsonb jsonb = JsonbBuilder.create();
        JsonMessage jsonMessage = jsonb.fromJson(message, JsonMessage.class);
        String messageContent = jsonMessage.content;
        String receiverName = jsonMessage.receiverName;

        final User sender = User.getUserByName(UserResource.users, senderName);
        final User receiver = User.getUserByName(UserResource.users, receiverName);
        final Chat chat = Chat.getChatByParticipants(chats, sender, receiver);

        if(!chats.contains(chat)) {
            chats.add(chat);
        }

//        if(message.equals("New User")) {
//            notifyUsersWhenNewUserRegisters(sender);
//        } else {
        chat.getMessages().add(new Message(sender, receiver, messageContent));
        messageContent = ">> " + senderName + ": " + messageContent;
        sendMessage(sender, receiver, messageContent);
//        }

//        broadcast(">> " + senderName + ": " + message);
    }

    private void sendMessage(User sender, User receiver, String message) {
//        Arrays.asList(sessions.get(sender.getName()), sessions.get(receiver.getName())).stream()
//                .forEach(session -> session
//                        .getAsyncRemote()
//                        .sendObject(message, result -> {
//                            if (result.getException() != null) {
//                                System.out.println("Unable to send message: " + result.getException());
//                            }
//                        })
//                );

        sessions.get(sender.getName())
                .getAsyncRemote()
                .sendObject(message, result -> {
                            if (result.getException() != null) {
                                System.out.println("Unable to send message: " + result.getException());
                            }
                });
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

