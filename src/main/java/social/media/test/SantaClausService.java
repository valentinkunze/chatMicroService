//package social.media.test;
//
//import social.media.model.ChatUser;
//import social.media.model.Message;
//import social.media.model.MessageRepository;
//import social.media.model.UserRepository;
//
//import javax.enterprise.context.ApplicationScoped;
//import javax.inject.Inject;
//import javax.persistence.EntityManager;
//import javax.transaction.Transactional;
//
//@ApplicationScoped
//public class SantaClausService {
//
//    @Inject
//    PersonRepository personRepository;
//
//    @Inject
//    MessageRepository messageRepository;
//
//    @Inject
//    UserRepository userRepository;
//
//    @Inject
//    EntityManager em;
//
//    @Transactional
//    public void createGift(String giftDescription) {
//        Person person = new Person();
//        person.setName("kshkjh");
//        person.setName(giftDescription);
//        personRepository.persist(person);
//        Message message = new Message();
//        message.setChatId(6);
//        messageRepository.persist(message);
//        Gift gift = new Gift();
//        gift.setName(giftDescription);
//        em.persist(gift);
//
//        ChatUser user = new ChatUser();
//        user.setUserName("aklsjfdg");
//        userRepository.persist(user);
//        gift.setName(giftDescription);
////        em.persist(user);
//
//    }
//
//
//}