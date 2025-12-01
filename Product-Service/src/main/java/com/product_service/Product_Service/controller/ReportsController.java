package com.product_service.Product_Service.controller;

import com.product_service.Product_Service.model.Product;
import com.product_service.Product_Service.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
public class ReportsController {

    private final ProductRepository repo;
    private final int LOW_STOCK_THRESHOLD = 3;

    @GetMapping("/by-category")
    public List<Map<String, Object>> byCategory() {
        Map<String, Long> map = repo.findAll()
                .stream()
                .collect(Collectors.groupingBy(Product::getCategoria, Collectors.counting()));

        // Convertir a una lista de { category, count } para frontend
        return map.entrySet().stream()
                .map(e -> {
                    Map<String, Object> m = new HashMap<>();
                    m.put("category", e.getKey());
                    m.put("count", e.getValue());
                    return m;
                })
                .collect(Collectors.toList());
    }

    @GetMapping("/low-stock")
    public List<Map<String, Object>> lowStock() {
        return repo.findAll()
                .stream()
                .filter(p -> p.getCantidad() <= LOW_STOCK_THRESHOLD)
                .map(p -> {
                    Map<String, Object> m = new HashMap<>();
                    m.put("id", p.getId());
                    m.put("nombre", p.getNombre());
                    m.put("cantidad", p.getCantidad());
                    return m;
                })
                .collect(Collectors.toList());
    }
}
