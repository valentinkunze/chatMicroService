package social.media.model;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.HashSet;

@Path("/users")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UserResource {

    public static HashSet<User> users = new HashSet<>();

    public UserResource() {}

    @GET
    public HashSet<User> list() {
        return users;
    }

}
