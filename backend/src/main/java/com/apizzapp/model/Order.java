package com.apizzapp.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDateTime orderDate;

    @Enumerated(EnumType.STRING) // Statut de la commande
    @Column(length = 30, nullable = false)
    private EOrderStatus status;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal totalAmount;

    // Relation ManyToOne avec User (Plusieurs commandes peuvent appartenir à un User)
    // fetch=LAZY => Ne charge pas l'utilisateur systématiquement (bonne pratique)
    // nullable=false => Une commande DOIT avoir un utilisateur associé
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Relation OneToMany avec OrderItem (Une commande contient plusieurs lignes/items)
    // cascade=ALL => Si on supprime une Order, ses OrderItem sont supprimés
    // orphanRemoval=true => Si on retire un OrderItem de la liste, il est supprimé
    // fetch=LAZY => Charger les items seulement quand nécessaire
    @OneToMany(mappedBy = "orderId", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<OrderItem> orderItems = new ArrayList<>(); // Initialiser

    @PrePersist // Méthode appelée juste avant la sauvegarde initiale
    protected void onCreate() {
        if (this.status == null) {
            this.status = EOrderStatus.PENDING; // Statut par défaut
        }
    }

    // --- equals() et hashCode() ---
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Order order = (Order) o;
        return id != null && id.equals(order.id);
    }

    @Override
    public int hashCode() {
         return id != null ? Objects.hash(id) : getClass().hashCode();
    }

}