package com.example.demo.controllers;

import com.example.demo.services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/mail")
public class EmailController {
    @Autowired
    private EmailService emailService;

    @GetMapping("/{to}/{bookId}")
    public ResponseEntity<String> sendEmail(@PathVariable String to, @PathVariable long bookId) {
        String subject = "Receipt for book issue";
        String body = "Book Issued";
        try {
            emailService.sendSimpleMessage(to, subject, body, bookId);
            return ResponseEntity.ok("Email sent successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to send email: " + e.getMessage());
        }
    }
}
