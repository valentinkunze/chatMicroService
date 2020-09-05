package social.media.model;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import io.quarkus.security.User;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;
import java.util.List;

@ApplicationScoped
public class UserRepository implements PanacheRepository<ChatUser>{

    public ChatUser findByName(String userName){
        return find("userName", userName).firstResult();
    }

    public List<ChatUser> findAllUsers() {
        return listAll();
    }

    @Transactional
    public void addUser(String userName) {
        ChatUser user = new ChatUser(userName);
        persist(user);
    }
}

