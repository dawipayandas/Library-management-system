package com.example.demo.services;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


import java.util.List;

@Component
public class RoleInitializer {

    @Autowired
    private RoleService roleService;

    @PostConstruct
    public void init() {
        if (roleService.getAllRoles().isEmpty()) {
            roleService.createRoles();
        }
    }
}
