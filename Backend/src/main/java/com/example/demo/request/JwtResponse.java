package com.example.demo.request;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter

public class JwtResponse {

    private String token;
    private Long id;
    private String username;
    private String email;
    private List<String> roles;


    public JwtResponse(String jwt, Long id, String username, String email, List<String> roles) {
        this.token = jwt;
        this.id = id;
        this.username = username;
        this.email = email;
        this.roles = roles;
    }
}