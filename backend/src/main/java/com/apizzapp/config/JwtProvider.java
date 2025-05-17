// // src/main/java/com/apizzapp/security/JwtProvider.java
// package com.apizzapp.security;

// import io.jsonwebtoken.Jwts;
// import io.jsonwebtoken.SignatureAlgorithm;
// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.stereotype.Component;

// import java.util.Date;

// @Component
// public class JwtProvider {
//   @Value("${app.jwtSecret:SECRET_KEY}") 
//   private String jwtSecret;

//   @Value("${app.jwtExpirationMs:3600000}")      // 1 hour
//   private int jwtExpirationMs;

//   public String generateToken(String username) {
//     return Jwts.builder()
//       .setSubject(username)
//       .setIssuedAt(new Date())
//       .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
//       .signWith(SignatureAlgorithm.HS512, jwtSecret.getBytes())
//       .compact();
//   }
// }
