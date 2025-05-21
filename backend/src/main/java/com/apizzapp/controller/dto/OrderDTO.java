package com.apizzapp.controller.dto;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;


public class OrderDTO {
    public Long userId;
    public List<OrderItemDTO> orderItems;
    public String scheduledTime;

    
    public static class OrderItemDTO {
        public Long pizzaId;
        public Integer quantity;
        public Set<Long> supplements; 
        public Set<Long> deplements; 
    }
}

