package com.product_service.Product_Service.service;

import com.product_service.Product_Service.model.Product;
import com.product_service.Product_Service.model.Movement;
import com.product_service.Product_Service.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository repo;
    private final MovementService movementService; // nuevo

    public Product save(Product product){
        Product saved = repo.save(product);

        Movement m = new Movement();
        m.setProductId(saved.getId());
        m.setProductName(saved.getNombre());
        m.setMovType("CREACION");
        m.setCantidad(saved.getCantidad());
        movementService.save(m);

        return saved;
    }

    public List<Product> getAll(){
        return repo.findAll();
    }

    public Product update(Long id, Product updated) {
        return repo.findById(id).map(existing -> {
            int prevQty = existing.getCantidad();
            existing.setNombre(updated.getNombre());
            existing.setCantidad(updated.getCantidad());
            existing.setCategoria(updated.getCategoria());
            Product saved = repo.save(existing);

            Movement m = new Movement();
            m.setProductId(saved.getId());
            m.setProductName(saved.getNombre());
            m.setMovType("ACTUALIZACION");
            m.setCantidad(saved.getCantidad() - prevQty); // diferencia (puede ser negativa)
            movementService.save(m);

            return saved;
        }).orElse(null);
    }

    public boolean delete(Long id) {
        return repo.findById(id).map(p -> {
            repo.deleteById(id);

            Movement m = new Movement();
            m.setProductId(id);
            m.setProductName(p.getNombre());
            m.setMovType("ELIMINACION");
            m.setCantidad(p.getCantidad());
            movementService.save(m);

            return true;
        }).orElse(false);
    }
}
