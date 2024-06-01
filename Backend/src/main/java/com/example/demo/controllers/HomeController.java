package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RestController

public class HomeController {

    @Value("${redirect.url}")
    String redirectUrl;
    @GetMapping("/api/protected")
    public ResponseEntity<String> hello(){
        return ResponseEntity.ok("PROTECTED ENDPOINT");
    }
    @GetMapping("/loginSuccess")
    public ResponseEntity<String> loginSuccess() {
        // Redirect to home page after successful login
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(URI.create("http://localhost:3000/home"));
        return new ResponseEntity<>(headers, HttpStatus.FOUND);
    }

    @GetMapping("/loginFailure")
    public String loginFailure() {
        // Redirect to login page with an error message
        return "redirect:/?error";
    }

}
