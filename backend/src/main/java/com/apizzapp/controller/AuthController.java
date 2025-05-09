// package com.apizzapp.controller;

// import com.apizzapp.model.User;
// import com.apizzapp.service.AuthService;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.*;

// @RestController
// @RequestMapping("/api/auth")
// public class AuthController {

//     @Autowired
//     private AuthService authService;

//     @PostMapping("/register")
//     public User register(@RequestParam String email,
//                          @RequestParam String password,
//                          @RequestParam String firstName,
//                          @RequestParam String lastName) {
//         return authService.registerUser(email, password, firstName, lastName);
//     }
// }
