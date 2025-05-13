package com.apizzapp.controller;

import com.apizzapp.model.User;
import com.apizzapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body("Email already registered.");
        }

        //Attention --> En production, hash le mot de passe avec BCrypt
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully.");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String email, @RequestParam String password) {
        Optional<User> userOpt = userRepository.findByEmail(email);

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(401).body("Invalid credentials.");
        }

        User user = userOpt.get();

        // Attention --> Comparaison simple pour l'instant — à sécuriser avec BCrypt en prod
        if (!user.getPassword().equals(password)) {
            return ResponseEntity.status(401).body("Invalid credentials.");
        }

        return ResponseEntity.ok("Login successful.");
    }
}

