package social.media.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import javax.persistence.Entity;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
public class Message extends PanacheEntity {

    private String userName1;
    private String userName2;
    private Integer chatId;
    private String message;
    private LocalDateTime sendTime;

    public static Integer getChatId(String user1, String user2) {
        return user1.hashCode() + user2.hashCode();
    }

    public Message(String userName1, String userName2, String message, LocalDateTime sendTime){
        this.userName1 = userName1;
        this.userName2 = userName2;
        this.message = message;
        this.sendTime = sendTime;
        chatId = getChatId(userName1, userName2);
    }

    public Message() {
    }

    public String getUserName1(){
        return userName1;
    }
    public void setUserName1(String user1){
        this.userName1 = user1;
    }

    public String getUserName2(){
        return userName2;
    }
    public void setUserName2(String user2){
        this.userName2 = user2;
    }

    public Integer getChatId(){
        return chatId;
    }
    public void setChatId(Integer chatId){
        this.chatId = chatId;
    }

    public String getMessage(){
        return message;
    }
    public void setMessage(String message){
        this.message = message;
    }

    public LocalDateTime getSendTime() {
        return sendTime;
    }
    public void setSendTime(LocalDateTime sendTime) {
        this.sendTime = sendTime;
    }
}
