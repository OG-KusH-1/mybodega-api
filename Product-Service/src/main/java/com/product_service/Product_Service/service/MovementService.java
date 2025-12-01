package com.product_service.Product_Service.service;

import com.product_service.Product_Service.model.Movement;
import com.product_service.Product_Service.repository.MovementRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MovementService {

    private final MovementRepository repo;

    public Movement save(Movement m) {
        return repo.save(m);
    }

    public List<Movement> getAll() {
        return repo.findAll();
    }
}
