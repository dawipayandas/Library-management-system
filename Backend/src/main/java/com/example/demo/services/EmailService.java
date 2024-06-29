package com.example.demo.services;

import com.example.demo.PdfGenerator;
import com.itextpdf.text.DocumentException;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String from;

    @Autowired
    private PdfGenerator pdfGenerator;

    public void sendSimpleMessage(String to, String subject, String text, long bookId) {
        try {
            ByteArrayOutputStream pdfStream = pdfGenerator.generatePdf(to, bookId);

            MimeMessage message = mailSender.createMimeMessage();



            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setFrom(from);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(text);


            helper.addAttachment("Receipt.pdf", new ByteArrayResource(pdfStream.toByteArray()));


            mailSender.send(message);
        } catch (MailException | IOException | DocumentException | MessagingException e) {
            System.err.println("Failed to send email: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
