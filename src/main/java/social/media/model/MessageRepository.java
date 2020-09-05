package social.media.model;

import io.quarkus.hibernate.orm.panache.PanacheRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
public class MessageRepository implements PanacheRepository<Message> {

    final String findAllMessagesByNamesQuery =
            "FROM  Message " +
            "WHERE ((userName1 = '%1$s' AND userName2 = '%2$s') " +
                    "OR (userName1 = '%2$s' AND userName2 = '%1$s')) " +
            "ORDER BY sendTime asc";

    public List<Message> findByName(String name){
        return find("userName1", name).stream().collect(Collectors.toList());
    }

    public List<Message> findAllMessagesByNames(String senderName, String receiverName) {
        return this.find( String.format(findAllMessagesByNamesQuery, senderName, receiverName)).list();
    }

    public List<Message> findAllMessages() {
        return listAll();
    }

    @Transactional
    public void addMessage(String senderName, String receiverName, String messageContent) {
        Message message = new Message(senderName, receiverName, messageContent, LocalDateTime.now());
        persist(message);
    }


//    public List<Message> findAlive(){
//        return list("status", Status.STATUS_ACTIVE); // Status.Alive
//    }
//
//    public void deleteStefs(){
//        delete("name", "Stef");
//    }
}
