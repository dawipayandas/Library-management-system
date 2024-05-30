package com.example.demo.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class HomeController {
    @GetMapping("/api/protected")
    public ResponseEntity<String> hello(){
        return ResponseEntity.ok("PROTECTED ENDPOINT");
    }
    @GetMapping("/loginSuccess")
    public ResponseEntity<String> loginSuccess() {
        return ResponseEntity.ok("Login Success");
    }
    @GetMapping("/loginFailure")
    public ResponseEntity<String> loginFailure() {
        return ResponseEntity.ok("Login Failure");
    }
}
