package com.apizzapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.apizzapp.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}

