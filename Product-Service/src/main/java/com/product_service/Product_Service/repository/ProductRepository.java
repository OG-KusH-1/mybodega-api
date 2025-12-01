package com.product_service.Product_Service.repository;

import com.product_service.Product_Service.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}

