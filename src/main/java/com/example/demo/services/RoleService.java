package com.example.demo.services;

import com.example.demo.models.ERole;
import com.example.demo.models.Role;
import com.example.demo.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    public void createRoles() {
        Role userRole = new Role(ERole.ROLE_USER); // For 'user' role
        Role adminRole = new Role(ERole.ROLE_ADMIN); // For 'admin' role
        roleRepository.save(userRole);
        roleRepository.save(adminRole);
    }

    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }
}
