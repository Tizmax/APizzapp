package com.apizzapp.model; 

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;
import java.util.HashSet; 
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "modified_pizzas")
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class ModifiedPizza { 

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "order_item_id", nullable = false)
    @JsonBackReference
    private OrderItem orderItem;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "pizza_id", nullable = false)
    private Pizza pizza;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "sauce_id")
    private Sauce sauce;

    @ManyToMany(fetch = FetchType.LAZY) 
    @JoinTable(
        name = "supplements",
        joinColumns = @JoinColumn(name = "modified_pizza_id"),
        inverseJoinColumns = @JoinColumn(name = "ingredient_id")
    )
    private Set<Ingredient> supplements = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY) 
    @JoinTable(
        name = "deplements",
        joinColumns = @JoinColumn(name = "modified_pizza_id"),
        inverseJoinColumns = @JoinColumn(name = "ingredient_id")
    )
    private Set<Ingredient> deplements = new HashSet<>();


    // equals/hashCode géré par Lombok
}