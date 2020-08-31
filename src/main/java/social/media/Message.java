package social.media;

import java.util.UUID;

public class Message {

    //---- Fields

    private User sender;
    private User receiver;
    private String contend;
    private final UUID messageId = UUID.randomUUID();

    //---- Constructor

    public Message(User sender, User receiver, String contend){
        this.sender = sender;
        this.receiver = receiver;
        this.contend = contend;
    }

    //---- Methods

    public User getSender() {
      return sender;
    }

    public User getReceiver() {
        return receiver;
    }

    public String getContend() {
        return contend;
    }

    public UUID getMessageId() {
        return messageId;
    }

}
