// package com.apizzapp.service;

// import com.apizzapp.model.User;
// import com.apizzapp.model.ERole;
// import com.apizzapp.repository.UserRepository; 
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.stereotype.Service;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UsernameNotFoundException;

// @Service
// public class AuthService {

//     @Autowired
//     private UserRepository userRepository;

//     @Autowired
//     private BCryptPasswordEncoder passwordEncoder; // Pour hacher le mot de passe

//     public User registerUser(String email, String password, String firstName, String lastName) {
//         if (userRepository.findByEmail(email).isPresent()) {
//             throw new RuntimeException("Email déjà utilisé");
//         }

//         // Création de l'utilisateur avec un rôle par défaut
//         User user = new User(email, passwordEncoder.encode(password), firstName, lastName);
//         user.setName(ERole.ROLE_USER); // Affectation du rôle USER
//         return userRepository.save(user);
//     }

//     public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
//         User user = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("Utilisateur non trouvé"));
//         return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), new ArrayList<>());
//     }
// }

