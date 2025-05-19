package com.apizzapp.model; // Assurez-vous que le package est correct

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;
import java.util.HashSet; // Importer HashSet
import java.util.Set;     // Importer Set
import java.util.Objects;

@Entity
@Table(name = "pizzas")
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class Pizza { 

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100, nullable = false, unique = true)
    private String name;

    // Prix de base de la pizza AVEC ses ingrédients standards
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

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
    public Pizza(String name, String description, BigDecimal price, String imageUrl) {
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
    }

    // equals/hashCode géré par Lombok
}