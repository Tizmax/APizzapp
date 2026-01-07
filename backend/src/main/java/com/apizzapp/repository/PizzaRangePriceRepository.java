package com.apizzapp.repository;

import com.apizzapp.model.PizzaRangePrice;
import com.apizzapp.model.PizzaSize;
import com.apizzapp.model.PriceRange;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PizzaRangePriceRepository extends JpaRepository<PizzaRangePrice, PizzaRangePrice.PizzaRangePriceId> {
    Optional<PizzaRangePrice> findByPriceRangeAndPizzaSize(PriceRange priceRange, PizzaSize pizzaSize);
}