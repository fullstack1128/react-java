package com.neoproxy.pro.mail;

import java.io.File;
import java.util.Properties;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import com.neoproxy.pro.enums.ConfigurationType;
import com.neoproxy.pro.service.ConfigurationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class EmailServiceImpl implements EmailService {
    @Autowired
    ConfigurationService confService;

    public JavaMailSender getJavaMailSender() {
        String host = confService.findValueByKey(ConfigurationType.EMAIL_SERVER_HOST.name());
        String port = confService.findValueByKey(ConfigurationType.EMAIL_SERVER_PORT.name());
        String username = confService.findValueByKey(ConfigurationType.EMAIL_SERVER_USERNAME.name());
        String password = confService.findValueByKey(ConfigurationType.EMAIL_SERVER_PASSWORD.name());

        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost(host);
        mailSender.setPort(Integer.parseInt(port));

        mailSender.setUsername(username);
        mailSender.setPassword(password);

        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.ssl.enable", "true");
        props.put("mail.debug", "false");

        return mailSender;
    }

    // Method 1
    // To send a simple email
    @Async
    public String sendSimpleMail(EmailDetails details) {
        // Try block to check for exceptions
        try {
            String sender = confService.findValueByKey(ConfigurationType.EMAIL_SERVER_SENDER.name());
            // Creating a simple mail message
            SimpleMailMessage mailMessage = new SimpleMailMessage();

            // Setting up necessary details
            mailMessage.setFrom(sender);
            mailMessage.setTo(details.getRecipient());
            mailMessage.setText(details.getMsgBody());
            mailMessage.setSubject(details.getSubject());

            // Sending the mail
            getJavaMailSender().send(mailMessage);
            log.info("Mail Sent Successfully...");
            return "Mail Sent Successfully...";
        }
        // Catch block to handle the exceptions
        catch (Exception e) {
            System.out.println("-----Error while Sending Mail " + e.getMessage());
            log.error("Error while Sending Mail", e);
            return "Error while Sending Mail";
        }
    }

    // Method 2
    // To send an email with attachment
    public String
    sendMailWithAttachment(EmailDetails details) {
        // Creating a mime message
        MimeMessage mimeMessage = getJavaMailSender().createMimeMessage();
        MimeMessageHelper mimeMessageHelper;

        try {
            String sender = confService.findValueByKey(ConfigurationType.EMAIL_SERVER_SENDER.name());
            // Setting multipart as true for attachments to
            // be send
            mimeMessageHelper
                    = new MimeMessageHelper(mimeMessage, true);
            mimeMessageHelper.setFrom(sender);
            mimeMessageHelper.setTo(details.getRecipient());
            mimeMessageHelper.setText(details.getMsgBody());
            mimeMessageHelper.setSubject(
                    details.getSubject());

            // Adding the attachment
            FileSystemResource file = new FileSystemResource(new File(details.getAttachment()));

            mimeMessageHelper.addAttachment(file.getFilename(), file);

            // Sending the mail
            getJavaMailSender().send(mimeMessage);
            return "Mail sent Successfully";
        }
        // Catch block to handle MessagingException
        catch (MessagingException e) {
            // Display message when exception occurred
            return "Error while sending mail!!!";
        }
    }
}