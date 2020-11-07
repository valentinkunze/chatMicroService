package social.media.model;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import io.quarkus.security.User;
import io.smallrye.mutiny.Multi;
import io.vertx.mutiny.pgclient.PgPool;
import io.vertx.mutiny.sqlclient.Row;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;
import java.util.List;

@ApplicationScoped
public class UserRepository implements PanacheRepository<ChatUser>{

    final String findUserByNameQuery =
            "FROM  Chatuser " +
                    "WHERE userName = '%s' " +
                    "ORDER BY sendTime asc";

    public ChatUser findByName(String userName){
        return find("userName", userName).firstResult();
    }

    public List<ChatUser> findUserByName(String senderName) {
        return this.find(String.format(findUserByNameQuery, senderName)).list();
    }

//    public static Multi<ChatUser> findAll(PgPool client) {
//        return client.query("SELECT id, userName FROM Chatuser").execute()
//                .onItem().transformToMulti(set -> Multi.createFrom().iterable(set))
//                .onItem().transform(ChatUser::from);
//    }

    public List<ChatUser> findAllUsers() {
        return listAll();
    }

    // TODO use client / async in addUser and not findAll
    @Transactional
    public void addUser(String userName) {
        ChatUser user = new ChatUser(userName);
        persist(user);
    }
}

