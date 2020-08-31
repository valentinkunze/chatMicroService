package social.media;

import javax.json.bind.annotation.JsonbProperty;

public class JsonMessage {

    @JsonbProperty("receiverName")
    public String receiverName;

    @JsonbProperty("content")
    public String content;

}
