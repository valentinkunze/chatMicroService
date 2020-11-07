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

//    @Inject
//    io.vertx.mutiny.pgclient.PgPool client;
//
//    @PostConstruct
//    void config() {
//            initdb();
//    }
//
//    private void initdb() {
//        client.query("FROM  Chatuser " + "WHERE userName = '%s' " + "ORDER BY sendTime asc");
//        client.query("DROP TABLE IF EXISTS Chatuser").execute()
//                .flatMap(r -> client.query("CREATE TABLE fruits (id SERIAL PRIMARY KEY, name TEXT NOT NULL)").execute())
//                .flatMap(r -> client.query("INSERT INTO fruits (name) VALUES ('Kiwi')").execute())
//                .await().indefinitely();
//    }
//
//    @GET
//    public Multi<ChatUser> get() {
//        return userRepository.findAll(client);
//    }
}


