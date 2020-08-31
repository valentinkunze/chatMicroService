package social.media;

import javax.json.bind.annotation.JsonbProperty;

public class JsonMessage {

    //---- Fields

    @JsonbProperty("receiverName")
    private String receiverName;

    @JsonbProperty("senderName")
    private String senderName;

    @JsonbProperty("content")
    private String content;


    //---- Methods

    public String getReceiverName() {
        return receiverName;
    }

    public String getSenderName() {
        return senderName;
    }

    public String getContent() {
        return content;
    }

    public void setReceiverName(String receiverName) {
        this.receiverName = receiverName;
    }

    public void setSenderName(String senderName) {
        this.senderName = senderName;
    }

    public void setContent(String content) {
        this.content = content;
    }



}
