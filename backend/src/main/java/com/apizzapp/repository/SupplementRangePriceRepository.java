package com.apizzapp.repository;

import com.apizzapp.model.SupplementRangePrice;
import com.apizzapp.model.PizzaSize;
import com.apizzapp.model.SupplementPriceRange;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SupplementRangePriceRepository extends JpaRepository<SupplementRangePrice, SupplementRangePrice.SupplementRangePriceId> {
    Optional<SupplementRangePrice> findBySupplementPriceRangeAndPizzaSize(SupplementPriceRange supplementPriceRange, PizzaSize pizzaSize);
}
