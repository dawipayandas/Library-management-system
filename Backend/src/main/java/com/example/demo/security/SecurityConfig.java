package com.example.demo.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.security.web.SecurityFilterChain;

@EnableWebSecurity
@Configuration
@Order(2)
public class SecurityConfig {

    @Autowired
    AuthEntryPointJwt unauthorizedHandler;
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth ->
                {auth.requestMatchers("/api/auth/**", "/").permitAll()
                        .requestMatchers("/api/test/**").permitAll()
                        .anyRequest().authenticated();})
                .exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler))
                .oauth2Login(oauth2 -> oauth2
                        .loginPage("/oauth2/authorization/google")
                                .defaultSuccessUrl("/loginSuccess", true)
                                .failureUrl("/loginFailure")
                        );

        return http.build();
    }
}
////
////
////
//
//
//
//
//












//    @Bean
//    public CorsFilter corsFilter() {
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        CorsConfiguration config = new CorsConfiguration();
//        config.setAllowCredentials(true);
//        config.addAllowedOrigin("http://localhost:3000");  // Add your frontend origin
//        config.addAllowedHeader("*");
//        config.addAllowedMethod("*");
//        source.registerCorsConfiguration("/**", config);
//        return new CorsFilter(source);
//    }
//}

//authorizeRequests(auth -> {
//                    auth.requestMatchers("/").permitAll()
//                            .anyRequest().authenticated();
//                })