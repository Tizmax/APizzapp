package com.apizzapp.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.EqualsAndHashCode;
import lombok.AllArgsConstructor;

import java.io.Serializable;
import java.math.BigDecimal;

@Entity
@Table(name = "pizza_range_prices")
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class PizzaRangePrice {

    @EmbeddedId
    private PizzaRangePriceId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("priceRangeId")
    @JoinColumn(name = "price_range_id")
    private PriceRange priceRange;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("sizeId")
    @JoinColumn(name = "size_id")
    private PizzaSize pizzaSize;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @Embeddable
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PizzaRangePriceId implements Serializable {
        @Column(name = "price_range_id")
        private Long priceRangeId;

        @Column(name = "size_id")
        private Long sizeId;
    }
}
