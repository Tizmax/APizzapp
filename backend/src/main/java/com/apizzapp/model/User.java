package com.apizzapp.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "users", uniqueConstraints = {
    @UniqueConstraint(columnNames = "email") // Assure l'unicité de l'email
})
@Getter
@Setter
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100, nullable = false, unique = true)
    private String email;

    @Column(length = 120, nullable = false) // Stocker le mot de passe hashé !
    private String password;

    @Column(length = 50)
    private String firstName;

    @Column(length = 50)
    private String lastName;

    // Utilisation d'un Enum pour les noms de rôle est une bonne pratique
    @Enumerated(EnumType.STRING) // Stocke le nom de l'enum ("ROLE_USER", "ROLE_ADMIN") en BDD (plus lisible que ORDINAL)
    @Column(length = 20, nullable = false)
    private ERole role = ERole.ROLE_USER; // Par défaut, un nouvel utilisateur est un utilisateur normal

    // Relation OneToMany avec Order (Un utilisateur peut avoir plusieurs commandes)
    // mappedBy="user" => Le champ "user" dans l'entité Order gère la clé étrangère
    // cascade=ALL => Si on supprime un User, ses commandes sont supprimées (Attention! Peut-être pas souhaitable)
    // orphanRemoval=true => Si on retire une commande de la liste orders du user, elle est supprimée de la BDD
    // fetch=LAZY => Ne charge pas les commandes sauf si on le demande explicitement (TRÈS IMPORTANT pour la perf)
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Order> orders = new ArrayList<>(); // Initialiser la collection

    public User(String email, String password, String firstName, String lastName) {
        this.email = email;
        this.password = password; // Assurez-vous de hasher le mot de passe avant de le sauvegarder !
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = ERole.ROLE_USER; // Par défaut
    }

    // --- equals() et hashCode() ---
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return id != null && id.equals(user.id);
    }

    @Override
    public int hashCode() {
        return id != null ? Objects.hash(id) : getClass().hashCode();
    }

    // --- Méthode utilitaire pour ajouter/retirer des commandes (gestion bidirectionnelle) ---
    // Si vous gérez la relation des deux côtés
    // public void addOrder(Order order) {
    //     orders.add(order);
    //     order.setUser(this);
    // }
    // public void removeOrder(Order order) {
    //     orders.remove(order);
    //     order.setUser(null);
    // }
}