package social.media.model;

import javax.json.bind.annotation.JsonbProperty;

public class Message {

    //---- Fields

    private User sender;
    private User receiver;
    private String contend;
    // todo timestamp

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

}
