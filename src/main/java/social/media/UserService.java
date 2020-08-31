package social.media;

import javax.enterprise.context.ApplicationScoped;
import java.util.ArrayList;
import java.util.List;

// TODO maybe Singleton

@ApplicationScoped
public class UserService {

    ArrayList<String> users = new ArrayList<>();

    public List getUsers() {
        return users;
    }

    public List addUsers(String userId) {
        users.add(userId);
        return users;
    }
}


