package social.media.model;

import org.jboss.resteasy.annotations.jaxrs.PathParam;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.HashMap;

@Path("/chatHistory")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ChatResource {

    public static HashMap<Integer, Chat> chats = new HashMap<>();

    public ChatResource() {}

    @GET
    @Path("/{senderName}/{receiverName}")
    public Chat getChats(@PathParam("senderName") String senderName, @PathParam("receiverName") String receiverName) {
        Integer chatId = senderName.hashCode() + receiverName.hashCode();
        return chats.get(chatId);
    }

//    @POST
//    public Chat add(Integer chatId, Chat chat) {
//        chats.put(chatId, chat);
//        return chat;
//    }
//
//    @DELETE
//    public Chat delete(Integer chatId, Chat chat) {
//        chats.remove(chatId, chat);
//        return chat;
//    }
}
