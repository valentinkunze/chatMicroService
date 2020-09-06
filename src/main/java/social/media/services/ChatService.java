package social.media.services;

import social.media.model.*;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
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

    @Inject
    MessageRepository messageRepository;

    @Inject
    UserRepository userRepository;

    @OnOpen
    public void onOpen(Session session, @PathParam("userName") String senderName) {
        if(sessions.keySet().contains(senderName)){
            //        if(!UserResource.users.stream().anyMatch(user -> user.getUserName().equals(senderName))) {
        }
        sessions.put(senderName, session);
        // todo make callback function
        new Thread(() -> {
            userRepository.addUser(senderName);
        }).start();
        notifyUsersWhenNewUserRegisters(senderName);
    }

    @OnClose
    public void onClose(Session session, @PathParam("userName") String senderName) {
        sessions.remove(senderName);
        userRepository.delete(userRepository.findByName(senderName));
    }

    @OnError
    public void onError(Session session, @PathParam("userName") String senderName, Throwable throwable) {
        sessions.remove(senderName);
        userRepository.delete(userRepository.findByName(senderName));
    }

    @OnMessage
    public void onMessage(String message, @PathParam("userName") String senderName) {
//        if(!UserResource.users.stream().anyMatch(user -> user.getName() == senderName && user.getName().equals(receiverName))) {
//            throw new IllegalArgumentException();
//        }
        final JsonMessage jsonMessage = JsonbBuilder.create().fromJson(message, JsonMessage.class);
        final String messageContent = jsonMessage.getContent();
        final String receiverName = jsonMessage.getReceiverName();
        new Thread(() -> {
            messageRepository.addMessage(senderName, receiverName, messageContent);;
        }).start();

        sendMessage(receiverName, message);
    }
    
    private void sendMessage(String receiverName, String message) {
        sessions.get(receiverName)
                .getAsyncRemote()
                .sendObject(message, result -> {
                    if (result.getException() != null) {
                        System.out.println("Unable to send message: " + result.getException());
                    }
                });
    }

    private void notifyUsersWhenNewUserRegisters(String senderName) {
        final String message = "New User";
        sessions.values().stream()
                .filter(session -> session != sessions.get(senderName))
                .forEach(s -> {
                    s.getAsyncRemote().sendObject(message, result ->  {
                        if (result.getException() != null) {
                            System.out.println("Unable to send message: " + result.getException());
                        }
                    });
                });
    }
}

