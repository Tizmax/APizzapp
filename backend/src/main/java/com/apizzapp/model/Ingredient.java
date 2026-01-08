package com.apizzapp.model; // Assurez-vous que le package est correct

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.EqualsAndHashCode; // Importer pour Lombok

@Entity
@Table(name = "ingredients")
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(of = "id") // equals/hashCode basé sur l'ID via Lombok
public class Ingredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100, nullable = false, unique = true)
    private String name; 

    // Indique si cet ingrédient peut être proposé comme supplément payant
    @Column(nullable = false)
    private boolean availableAsSupplement = true; // Par défaut, on peut l'ajouter

    // Prix de cet ingrédient S'IL EST AJOUTÉ comme supplément
    // Peut être 0.00 si le supplément est gratuit, ou null/0 si non dispo en supplément
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "supplement_price_range_id")
    private SupplementPriceRange supplementPriceRange;

    @Column(length = 255)
    private String imageUrl;


    public Ingredient(String name, String description, boolean availableAsSupplement, SupplementPriceRange supplementPriceRange) {
        this.name = name;
        this.availableAsSupplement = availableAsSupplement;
        this.supplementPriceRange = supplementPriceRange;
    }

    // equals/hashCode géré par Lombok @EqualsAndHashCode(of = "id")
}