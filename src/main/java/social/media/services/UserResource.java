package social.media.services;

import org.jboss.resteasy.annotations.jaxrs.PathParam;
import social.media.model.ChatUser;
import social.media.model.UserRepository;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/users")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UserResource {

    @Inject
    UserRepository userRepository;

    public UserResource() {}

    @GET
    public List<ChatUser> getAllUsers() {
        return userRepository.findAllUsers();
    }

    @GET
    @Path("/{userName}")
    public ChatUser getUser(@PathParam("userName") String userName) {
        return userRepository.findByName(userName);
    }

}


