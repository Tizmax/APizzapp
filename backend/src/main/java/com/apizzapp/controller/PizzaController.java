package com.apizzapp.controller;

import java.math.BigDecimal;
import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.apizzapp.model.Pizza;
import com.apizzapp.repository.PizzaRepository;
import com.apizzapp.model.Ingredient;
import com.apizzapp.repository.IngredientRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class PizzaController {
    

    @Autowired
    PizzaRepository pizza;


    @Autowired
    IngredientRepository ingredient;


    @GetMapping("/listerPizza")
    Collection<Pizza> ListerPizza() {return pizza.findAll();}

    
    @GetMapping("/getPizzaById/{id}")
    public Pizza getPizzaById(@PathVariable Long id) {
        return pizza.findById(id).orElseThrow(() -> new RuntimeException("Pizza not found"));
    }

    @GetMapping("/getAllIngredients")
    Collection<Ingredient> getAllIngredients() {
        return ingredient.findAll();
    }
    

    @GetMapping("/ajoutPizza")
    public void ajoutPizza() {
    }
}
