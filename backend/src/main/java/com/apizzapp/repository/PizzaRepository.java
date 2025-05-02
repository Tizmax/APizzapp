package com.apizzapp.repository;

import com.apizzapp.model.Pizza;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository // Bonne pratique, bien que souvent optionnel avec JpaRepository
public interface PizzaRepository extends JpaRepository<Pizza, Long> {
    // Spring Data JPA fournit findById, findAll, save, deleteById, etc.
    // Vous pourrez ajouter ici des méthodes de recherche personnalisées plus tard
    // ex: Optional<Pizza> findByName(String name);
}