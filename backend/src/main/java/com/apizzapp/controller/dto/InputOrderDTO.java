package com.apizzapp.controller.dto;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;


public class InputOrderDTO { 
    
    public String scheduledTime;
    public String firstNameGuest;
    public String lastNameGuest;
    public Long userId;

    public List<OrderItemDTO> orderItems;
    
    public static class OrderItemDTO {
        public Integer quantity;
        public ModifiedPizzaDTO half1;
        public ModifiedPizzaDTO half2;
    }

    public static class ModifiedPizzaDTO {
        public Long pizzaId;
        public List<Long> supplementsId = new ArrayList<>();
        public List<Long> deplementsId = new ArrayList<>();
    }
    
}

