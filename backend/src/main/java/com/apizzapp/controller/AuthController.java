package com.apizzapp.controller;

import com.apizzapp.model.User;
import com.apizzapp.model.ERole;
import com.apizzapp.controller.dto.AuthDTO;
import com.apizzapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AuthDTO req) {
        if (userRepository.existsByEmail(req.email)) {
            return ResponseEntity.badRequest().body(Map.of("error", ""));
        }

        User user = new User();
        user.setEmail(req.email);
        user.setPassword(passwordEncoder.encode(req.password));
        user.setFirstName(req.firstName);
        user.setLastName(req.lastName);
        user.setRole(ERole.ROLE_USER);    

        userRepository.save(user);
        return ResponseEntity
           .ok(Map.of("message", ""));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String email,
                                   @RequestParam String password) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty() || !passwordEncoder.matches(password, userOpt.get().getPassword())) {
            return ResponseEntity
              .status(401)
              .body(Map.of("error", ""));
        }
        User user = userOpt.get();
        return ResponseEntity.ok(Map.of(
            "email", user.getEmail(),
            "role", user.getRole().name()
        ));
    }
}
