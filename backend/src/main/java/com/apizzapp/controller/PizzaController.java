package com.apizzapp.controller;

import java.math.BigDecimal;
import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.apizzapp.model.Pizza;
import com.apizzapp.repository.PizzaRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class PizzaController {
    

    @Autowired
    PizzaRepository pr;


    @GetMapping("/listerPizza")
    Collection ListerPizza() {return pr.findAll();}

    @GetMapping("/ajoutPizza")
    public void ajoutPizza() {
    }
}
