package com.apizzapp.model; 

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;
import java.util.HashSet; 
import java.util.Set;

@Entity
@Table(name = "order_items")
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class OrderItem { 

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long orderId;

    @Column(length = 100, nullable = false, unique = true)
    private String name;

    // Prix de base de la pizza AVEC ses ingrédients standards
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal basePrice;

    @Column(length = 255)
    private String imageUrl;

    // Relation ManyToMany pour définir les ingrédients de base de la recette
    @ManyToMany(fetch = FetchType.LAZY) // LAZY est bien ici
    @JoinTable(
        name = "pizza_base_ingredients", // Table de jointure pour la recette
        joinColumns = @JoinColumn(name = "pizza_id"),
        inverseJoinColumns = @JoinColumn(name = "ingredient_id")
    )
    private Set<Ingredient> baseIngredients = new HashSet<>(); // Les ingrédients standards

    // Correction: Constructeur correct
    public OrderItem(String name, String description, BigDecimal basePrice, String imageUrl) {
        this.name = name;
        this.basePrice = basePrice;
        this.imageUrl = imageUrl;
    }

    // equals/hashCode géré par Lombok
}