//package social.media.test;
//
//import io.quarkus.hibernate.orm.panache.PanacheRepository;
//
//import javax.enterprise.context.ApplicationScoped;
//import javax.transaction.Status;
//import java.util.List;
//
//@ApplicationScoped
//public class PersonRepository implements PanacheRepository<Person> {
//
//    // put your custom logic here as instance methods
//
//    public Person findByName(String name){
//        return find("name", name).firstResult();
//    }
//
//    public List<Person> findAlive(){
//        return list("status", Status.STATUS_ACTIVE); // Status.Alive
//    }
//
//    public void deleteStefs(){
//        delete("name", "Stef");
//    }
//}
