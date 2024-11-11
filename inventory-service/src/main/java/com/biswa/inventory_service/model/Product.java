package com.biswa.inventory_service.model;


import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "product")
public class    Product {
    @Id
   // @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Long id;
    @Column(name="category", nullable = false)
    private String category;
    @Column(name = "product_name")
    private String name;
    @Column(name = "price")
    private int price;

}
