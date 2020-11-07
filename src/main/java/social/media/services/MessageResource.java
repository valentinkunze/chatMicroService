package social.media.services;

import org.jboss.resteasy.annotations.jaxrs.PathParam;
import social.media.model.Message;
import social.media.model.MessageRepository;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/chatHistory")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class MessageResource {

    @Inject
    MessageRepository messageRepository;

    public MessageResource() {}

    @GET
    public List<Message> getMessages() {
        return messageRepository.findAllMessages();
    }

    @GET
    @Path("/{senderName}")
    public List<Message> getMessages(@PathParam("senderName") String senderName) {
        return messageRepository.findByName(senderName);
    }

    @GET
    @Path("/{senderName}/{receiverName}")
    public List<Message> getMessages(@PathParam("senderName") String senderName, @PathParam("receiverName") String receiverName) {
        return messageRepository.findAllMessagesByNames(senderName, receiverName);
    }
}
