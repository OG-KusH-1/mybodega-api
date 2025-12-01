package com.product_service.Product_Service.service;

import com.product_service.Product_Service.model.ShoppingItem;
import com.product_service.Product_Service.repository.ShoppingItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ShoppingItemService {

    private final ShoppingItemRepository repo;

    public ShoppingItem save(ShoppingItem item){
        return repo.save(item);
    }

    public List<ShoppingItem> getAll(){
        return repo.findAll();
    }

    public boolean delete(Long id){
        if(!repo.existsById(id)) return false;
        repo.deleteById(id);
        return true;
    }
}
