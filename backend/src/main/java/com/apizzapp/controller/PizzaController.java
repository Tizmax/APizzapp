package com.apizzapp.controller;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.jaxb.SpringDataJaxb.OrderDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.apizzapp.model.Pizza;
import com.apizzapp.repository.PizzaRepository;
import com.apizzapp.model.Ingredient;
import com.apizzapp.repository.IngredientRepository;
import com.apizzapp.model.Order;
import com.apizzapp.repository.OrderRepository;
import com.apizzapp.controller.dto.OrderDTO;
import com.apizzapp.model.EOrderStatus;
import com.apizzapp.model.OrderItem;
import com.apizzapp.repository.UserRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class PizzaController {
    

    @Autowired
    PizzaRepository pizza;


    @Autowired
    IngredientRepository ingredient;

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    UserRepository userRepository;


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
    
    @GetMapping("/listerOrder")
    Collection<Order> ListerOrder() {return orderRepository.findAll();}

    @PostMapping("/placeOrder")
    public ResponseEntity<?> createOrder(@RequestBody OrderDTO orderDTO) {

        Order order = new Order();
        order.setOrderDate(LocalDateTime.now());
        order.setTotalAmount(orderDTO.totalAmount);
        order.setOrderItems(new ArrayList<OrderItem>());
        order.setUser(userRepository.findById(orderDTO.userId).orElseThrow(() -> new RuntimeException("User not found")));

        orderRepository.save(order);
        return ResponseEntity.ok().build();
    }


}
