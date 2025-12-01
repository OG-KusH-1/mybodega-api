package com.product_service.Product_Service.controller;

import com.product_service.Product_Service.model.Movement;
import com.product_service.Product_Service.service.MovementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movements")
@RequiredArgsConstructor
public class MovementController {

    private final MovementService service;

    @PostMapping
    public ResponseEntity<Movement> create(@RequestBody Movement movement){
        return ResponseEntity.ok(service.save(movement));
    }

    @GetMapping
    public ResponseEntity<List<Movement>> getAll(){
        return ResponseEntity.ok(service.getAll());
    }
}
