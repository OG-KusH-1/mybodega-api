package com.product_service.Product_Service.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class ShoppingItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    private int cantidad;
}
