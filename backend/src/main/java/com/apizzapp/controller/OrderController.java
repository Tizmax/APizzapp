package com.apizzapp.controller;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.apizzapp.repository.OrderRepository;

@RestController
public class OrderController {

    @Autowired
    OrderRepository or;

    @GetMapping("/listerOrder")
    Collection ListerOrder() {return or.findAll();}

    @GetMapping("/ajoutOrder")
    public void ajoutOrder() {
    }
    
}
