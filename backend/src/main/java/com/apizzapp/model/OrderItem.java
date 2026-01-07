package com.apizzapp.model; 

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.EqualsAndHashCode;


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

    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    @JsonBackReference
    private Order order;

    @ManyToOne
    @JoinColumn(name = "size_id", nullable = false)
    private PizzaSize size;

    @Column(nullable = false)
    private Integer quantity;

    @OneToOne(cascade = CascadeType.ALL) // or @ManyToOne
    @JoinColumn(name = "half1_id", nullable= true)
    @JsonManagedReference
    private ModifiedPizza half1;

    @OneToOne(cascade = CascadeType.ALL) // or @ManyToOne
    @JoinColumn(name = "half2_id", nullable= true)
    @JsonManagedReference
    private ModifiedPizza half2;

}