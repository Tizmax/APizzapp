package com.apizzapp.controller.dto;

import java.math.BigDecimal;
import java.util.List;


public class OrderDTO {
    public Long userId;
    public BigDecimal totalAmount;
    public List<OrderItemDTO> orderItems;

    
    public static class OrderItemDTO {
        public Long productId;
        public Integer quantity;
        public BigDecimal price;
    }
}

