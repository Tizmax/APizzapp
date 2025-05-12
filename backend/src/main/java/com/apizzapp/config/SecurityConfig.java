// package com.apizzapp.config;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.config.Customizer;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.security.provisioning.InMemoryUserDetailsManager; // ← import corrigé
// import org.springframework.security.core.userdetails.User;
// import org.springframework.security.core.userdetails.UserDetails;

// @Configuration
// public class SecurityConfig {

//     @Bean
//     public InMemoryUserDetailsManager userDetailsService() {
//         // juste pour tests : un utilisateur en mémoire
//         UserDetails user = User.withUsername("user")
//                 .password(passwordEncoder().encode("password"))
//                 .roles("USER")
//                 .build();
//         return new InMemoryUserDetailsManager(user);
//     }

//     @Bean
//     public PasswordEncoder passwordEncoder() {
//         return new BCryptPasswordEncoder();
//     }

//     @Bean
//     public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//         http
//           .csrf(csrf -> csrf.disable())
//           .authorizeHttpRequests(auth -> auth
//             .requestMatchers("/api/auth/**").permitAll()
//             .anyRequest().authenticated()
//           )
//           .httpBasic(Customizer.withDefaults());
//         return http.build();
//     }
// }
