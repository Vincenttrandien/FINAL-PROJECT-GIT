package greenwich.englishcenter.backend.Service.impl;


import greenwich.englishcenter.backend.Entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class NotificationServiceImpl {

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    PasswordEncoder encoder;


    private NotificationServiceImpl(JavaMailSender javaMailSender){
        this.javaMailSender = javaMailSender;
    }

    public void sendNotification(User user){
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(user.getEmail());
        mailMessage.setSubject("WELCOME TO ENGLISH TRAINER ");
        mailMessage.setText("Hello," +
                "\n" +
                "\n" +
                "\n" +
                "\n" + "Thank you for choosing and accompanying us in the course. This is a PERSONAL account used to participate in school activities. Please do not give your account to others :" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +"Username : " + user.getUsername() +
                "\n" + "Password : 12345678 " +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" + "Best Regards! .");
//        mailMessage.setText("Username :" + user.getUsername());
//        mailMessage.setText("Password :" + user.getPassword());
//        mailMessage.setText("Best Regards! .");


        javaMailSender.send(mailMessage);
    }
}
