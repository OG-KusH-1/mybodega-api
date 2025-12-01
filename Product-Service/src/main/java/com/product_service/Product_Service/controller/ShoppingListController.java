package com.product_service.Product_Service.controller;

import com.product_service.Product_Service.model.Product;
import com.product_service.Product_Service.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shopping")
@RequiredArgsConstructor
public class ShoppingListController {

    private final ProductRepository productRepository;
    private final int LOW_STOCK_THRESHOLD = 3;

    @GetMapping
    public ResponseEntity<List<Product>> getLowStock() {
        List<Product> low = productRepository.findAll()
                .stream()
                .filter(p -> p.getCantidad() <= LOW_STOCK_THRESHOLD)
                .toList();
        return ResponseEntity.ok(low);
    }
}
