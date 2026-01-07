package com.apizzapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.apizzapp.model.Sauce;

@Repository
public interface SauceRepository extends JpaRepository<Sauce, Long> {
}
