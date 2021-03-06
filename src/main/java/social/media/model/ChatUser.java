package social.media.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import io.smallrye.mutiny.Multi;
import io.vertx.mutiny.pgclient.PgPool;
import io.vertx.mutiny.sqlclient.Row;
import social.media.services.UserResource;

import javax.json.bind.annotation.JsonbProperty;

import javax.persistence.Entity;

@Entity
public class ChatUser extends PanacheEntity {

//    @JsonbProperty("id")
    private Long id;
//    @JsonbProperty("userName")
    private String userName;


    public ChatUser() { }

    public ChatUser(String userName) {
        this.userName = userName;
    }

    public static ChatUser from(Row row) {
        return new ChatUser(row.getString("userName"));
    }

    public Long getId(){
        return id;
    }
    public void setId(Long id){
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName){
        this.userName = userName;
    }

//    public static User getUserByName(String userName) {
//        for(User user : UserResource.users)
//            if (user.getUserName().equals(userName)) {
//                return user;
//            }
//        return new User(userName);
//    }

}
