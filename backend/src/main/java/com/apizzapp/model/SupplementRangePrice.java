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
@Table(name = "supplement_range_prices")
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class SupplementRangePrice {

    @EmbeddedId
    private SupplementRangePriceId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("supplementPriceRangeId")
    @JoinColumn(name = "supplement_price_range_id")
    private SupplementPriceRange supplementPriceRange;

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
    public static class SupplementRangePriceId implements Serializable {
        @Column(name = "supplement_price_range_id")
        private Long supplementPriceRangeId;

        @Column(name = "size_id")
        private Long sizeId;
    }
}
