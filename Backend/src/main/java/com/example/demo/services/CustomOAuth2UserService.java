//package com.example.demo.services;
//import com.example.demo.models.User;
//import com.example.demo.repositories.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
//import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
//import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
//import org.springframework.security.oauth2.core.oidc.user.OidcUser;
//import org.springframework.security.oauth2.core.oidc.user.OidcUserAuthority;
//import org.springframework.stereotype.Service;
//
//import java.util.HashSet;
//import java.util.Set;
//
//@Service
//public class CustomOAuth2UserService extends DefaultOAuth2UserService {
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Override
//    public OidcUser loadUser(OAuth2UserRequest userRequest) {
//        OidcUser oidcUser = (OidcUser) super.loadUser(userRequest);
//
//        String email = oidcUser.getEmail();
//        String username = oidcUser.getPreferredUsername();
//
//        // Custom processing: Save or update user information in the database
//        User user = userRepository.findByEmail(email);
//        if (user == null) {
//            user = new User();
//            user.setEmail(email);
//            user.setUsername(username);
//            user.setPassword(""); // Set an empty password or a generated one for OAuth2 users
//            userRepository.save(user);
//        } else {
//            user.setUsername(username);
//            userRepository.save(user);
//        }
//
//        Set<OidcUserAuthority> mappedAuthorities = (Set<OidcUserAuthority>) new HashSet<>(oidcUser.getAuthorities());
//
//        return new DefaultOidcUser(mappedAuthorities, oidcUser.getIdToken(), oidcUser.getUserInfo());
//    }
//}
