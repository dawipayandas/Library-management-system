package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;

@Controller

public class HomeController {

    @GetMapping("/")
    public String home(){
        return "home";
    }

    @Value("${redirect.url}")
    String redirectUrl;
//    @GetMapping("/api/check")
//    public boolean hello(){
//        return true;
//    }

@GetMapping("/loginSuccess")
    public String loginSuccess() {
        return "redirect:http://localhost:3000/home";
    }

    @GetMapping("/loginFailure")
    public String loginFailure() {
        // Redirect to login page with an error message
        return ("redirect:"+redirectUrl);
    }

//    @GetMapping("/api/check")
//    public ResponseEntity<Map<String, Boolean>> checkAuthentication(Authentication authentication) {
//        Map<String, Boolean> response = new HashMap<>();
//        response.put("authenticated", authentication != null && authentication.isAuthenticated());
//        return ResponseEntity.ok(response);
//    }
    @GetMapping("/api/check")
    public String check() {
    return "Hello";
    }
    @GetMapping("/api/protected")
    public String protectedPage() {
    return "protected api";
    }

}
