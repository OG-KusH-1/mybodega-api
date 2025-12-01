package com.product_service.Product_Service.repository;

import com.product_service.Product_Service.model.Movement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovementRepository extends JpaRepository<Movement, Long> {
}
