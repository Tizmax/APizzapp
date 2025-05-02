package com.apizzapp.repository;

import com.apizzapp.model.Pizza;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository 
public interface IngredientRepository extends JpaRepository<Ingredient, Long> {
}