package social.media;

import java.util.List;
import java.util.Set;

public class User {

    private String name;

    public User(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public static User getUserByName(Set<User> users, String userName) {
        for(User user : users)
            if (user.getName().equals(userName)) {
                return user;
            }
        return new User(userName);
    }

}
