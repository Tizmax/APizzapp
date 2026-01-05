package com.apizzapp.controller;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.Map; 

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.apizzapp.model.Pizza;
import com.apizzapp.repository.PizzaRepository;
import com.apizzapp.model.Ingredient;
import com.apizzapp.model.ModifiedPizza;
import com.apizzapp.repository.ModifiedPizzaRepository;
import com.apizzapp.repository.IngredientRepository;
import com.apizzapp.model.Order;
import com.apizzapp.repository.OrderRepository;
import com.apizzapp.controller.dto.InputOrderDTO;
import com.apizzapp.model.EOrderStatus;
import com.apizzapp.model.OrderItem;
import com.apizzapp.repository.OrderItemRepository;
import com.apizzapp.repository.UserRepository;

@RequestMapping("/api")
@CrossOrigin(origins = "*")
@RestController
public class PizzaController {
    
    @Autowired
    PizzaRepository pizzaRepository;

    @Autowired
    ModifiedPizzaRepository modifiedPizzaRepository;

    @Autowired
    IngredientRepository ingredientRepository;

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    OrderItemRepository orderItemRepository;

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
    public ResponseEntity<?> createOrder(@RequestBody InputOrderDTO orderDTO) {
        // 1. Création et sauvegarde initiale de l'Order
        Order order = new Order();
        order.setScheduledTime(orderDTO.scheduledTime);
        order.setFirstNameGuest(orderDTO.firstNameGuest);
        order.setLastNameGuest(orderDTO.lastNameGuest);
        order.setStatus(EOrderStatus.PENDING);
        order.setTotalAmount(BigDecimal.ZERO);
        
        if (orderDTO.userId != null) {
            order.setUser(userRepository.findById(orderDTO.userId).orElse(null));
        }
        
        // On sauve l'objet pour qu'il soit "attaché" à Hibernate
        Order savedOrder = orderRepository.save(order);

        // 2. Création des items en mémoire
        List<OrderItem> items = orderDTO.orderItems.stream().map(itemDTO -> {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(savedOrder);
            orderItem.setQuantity(itemDTO.quantity != null ? itemDTO.quantity : 1);

            // Pizza Half 1
            ModifiedPizza h1 = createPizza(itemDTO.half1, orderItem);
            orderItem.setHalf1(h1);

            // Pizza Half 2 (Optionnel)
            if (itemDTO.half2 != null && itemDTO.half2.pizzaId != null) {
                ModifiedPizza h2 = createPizza(itemDTO.half2, orderItem);
                orderItem.setHalf2(h2);
            }

            return orderItem;
        }).collect(Collectors.toList());

        // 3. MISE À JOUR DE LA COLLECTION (La correction est ici !)
        savedOrder.getOrderItems().clear();
        savedOrder.getOrderItems().addAll(items);

        // 4. Calcul du prix total
        BigDecimal total = items.stream().map(
            item -> calculateItemPrice(item)
        ).reduce(BigDecimal.ZERO, BigDecimal::add);

        savedOrder.setTotalAmount(total);

        // 5. Sauvegarde finale
        return ResponseEntity.ok(orderRepository.save(savedOrder));
    }

    private ModifiedPizza createPizza(InputOrderDTO.ModifiedPizzaDTO dto, OrderItem item) {
        ModifiedPizza mp = new ModifiedPizza();
        mp.setPizza(pizzaRepository.findById(dto.pizzaId).orElseThrow());
        mp.setOrderItem(item);
        if (dto.supplementsId != null) {
            mp.setSupplements(new HashSet<>(ingredientRepository.findAllById(dto.supplementsId)));
        }
        if (dto.deplementsId != null) {
            mp.setDeplements(new HashSet<>(ingredientRepository.findAllById(dto.deplementsId)));
        }
        return mp; // On ne sauve pas encore, le Cascade s'en chargera
    }

    private BigDecimal calculateItemPrice(OrderItem item) {

        BigDecimal price = BigDecimal.ZERO;
        if (item.getHalf2() != null) {
            price = item.getHalf1().getPizza().getPrice().max(item.getHalf2().getPizza().getPrice());
        } else {
            price = item.getHalf1().getPizza().getPrice();
        }

        if (item.getHalf1().getSupplements() != null) {
            BigDecimal supps = item.getHalf1().getSupplements().stream()
                .map(ing -> ing.getSupplementPrice() != null ? ing.getSupplementPrice() : BigDecimal.ZERO)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
            price = price.add(supps);
        }
        if (item.getHalf2() != null && item.getHalf2().getSupplements() != null) {
            BigDecimal supps = item.getHalf2().getSupplements().stream()
                .map(ing -> ing.getSupplementPrice() != null ? ing.getSupplementPrice() : BigDecimal.ZERO)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
            price = price.add(supps);
        }
        return price.multiply(new BigDecimal(item.getQuantity()));
    }

    @GetMapping("/deleteOrder/{id}")
    public ResponseEntity<?> deleteOrder(@PathVariable Long id) {
        orderRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/updateIngredients")
    public ResponseEntity<?> updateIngredients(@RequestBody List<Ingredient> ingredients) {
        ingredientRepository.saveAll(ingredients);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/listerOrder/orders/status") 
    public ResponseEntity<?> updateOrderStatus(@RequestBody Map<String, String> payload) {
        String idStr = payload.get("id");
        String statusStr = payload.get("status");
        Long orderId = Long.valueOf(idStr);
        EOrderStatus newStatus = EOrderStatus.valueOf(statusStr);
        Order order = orderRepository.findById(orderId)
        .orElseThrow(() -> new RuntimeException("Order not found with ID: " + orderId));
        order.setStatus(newStatus);
        orderRepository.save(order);

        return ResponseEntity.ok(order);
    }

}
