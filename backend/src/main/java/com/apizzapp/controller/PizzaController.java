package com.apizzapp.controller;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

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
    PizzaRepository pizzaRepository;


    @Autowired
    IngredientRepository ingredientRepository;

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    UserRepository userRepository;


    @GetMapping("/listerPizza")
    Collection<Pizza> ListerPizza() {return pizzaRepository.findAll();}

    
    @GetMapping("/getPizzaById/{id}")
    public Pizza getPizzaById(@PathVariable Long id) {
        return pizzaRepository.findById(id).orElseThrow(() -> new RuntimeException("Pizza not found"));
    }

    @GetMapping("/getAllIngredients")
    Collection<Ingredient> getAllIngredients() {
        return ingredientRepository.findAll();
    }
    
    @GetMapping("/listerOrder")
    Collection<Order> ListerOrder() {return orderRepository.findAll();}

    @PostMapping("/placeOrder")
    public ResponseEntity<?> createOrder(@RequestBody OrderDTO orderDTO) {

        Order order = new Order();
        order.setOrderDate(LocalDateTime.now());

        // A CHANGER : Calcul du montant coté back pour éviter les failles
        order.setTotalAmount(orderDTO.totalAmount);
        order.setUser(userRepository.findById(orderDTO.userId).orElseThrow(() -> new RuntimeException("User not found")));

        Order savedOrder = orderRepository.save(order);

        // On récupère la liste actuelle (gérée par Hibernate) et on la modifie
        List<OrderItem> targetList = savedOrder.getOrderItems();
        targetList.clear(); // supprime les anciens éléments (et déclenche orphanRemoval)
        targetList.addAll(
            orderDTO.orderItems.stream()
                .map(itemDTO -> {
                    OrderItem orderItem = new OrderItem();
                    orderItem.setPizza(pizzaRepository.findById(itemDTO.pizzaId)
                        .orElseThrow(() -> new RuntimeException("Pizza not found")));
                    orderItem.setOrderId(savedOrder.getId());
                    
                    orderItem.setQuantity(itemDTO.quantity);

                    if (itemDTO.supplements != null && !itemDTO.supplements.isEmpty()) {
                        orderItem.setSupplements(new HashSet<>(ingredientRepository.findAllById(itemDTO.supplements)));
                    } else {
                        orderItem.setSupplements(new HashSet<>());
                    }
                    if (itemDTO.deplements != null && !itemDTO.deplements.isEmpty()) {
                        orderItem.setDeplements(new HashSet<>(ingredientRepository.findAllById(itemDTO.deplements)));
                    } else {
                        orderItem.setDeplements(new HashSet<>());
                    }
                    return orderItem;
                })
                .collect(Collectors.toCollection(ArrayList::new))
        );
        
        // Calculate total amount after all items are created
        BigDecimal totalAmount = savedOrder.getOrderItems().stream()
            .map(item -> item.getPizza().getPrice().multiply(new BigDecimal(item.getQuantity())))
            .reduce(BigDecimal.ZERO, BigDecimal::add);

        // Update the order with the calculated total
        savedOrder.setTotalAmount(totalAmount);
        orderRepository.save(savedOrder);

        return ResponseEntity.ok().build();
    }


}
