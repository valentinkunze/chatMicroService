package social.media;

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

    @POST
//    @Path("/name/{name}")
//    @Path("{name}")
//    @Produces("application/json")
//    @PathParam("name") String name ,
    public HashSet<User> add(User user) {
        users.add(user);
        return users;
    }

    @DELETE
    public HashSet<User> delete(User user) {
        users.removeIf(user1 -> user1.getName().contentEquals(user.getName()));
        return users;
    }
}
