package com.product_service.Product_Service.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;


@Data
@Entity
@Table(name = "movement")
public class Movement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "product_id")
    private Long productId;

    @Column(name = "product_name")
    private String productName;

    @Column(name = "mov_type")
    @JsonProperty("type")
    private String movType;   // el front leerá "type"

    @Column(name = "cantidad")
    @JsonProperty("quantity")
    private int cantidad;     // el front leerá "quantity"

    @Column(name = "mov_date")
    @JsonProperty("date")
    private LocalDateTime movDate = LocalDateTime.now();  // el front leerá "date"
}

