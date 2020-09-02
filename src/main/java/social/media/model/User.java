package social.media.model;

public class User {

    private String name;

    public User(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public static User getUserByName(String userName) {
        for(User user : UserResource.users)
            if (user.getName().equals(userName)) {
                return user;
            }
        return new User(userName);
    }

}
