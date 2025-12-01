package com.product_service.Product_Service.service.service;

import com.product_service.Product_Service.model.Product;
import com.product_service.Product_Service.repository.ProductRepository;
import com.product_service.Product_Service.service.ProductService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ProductServiceTest {

    @Mock
    private ProductRepository repository;

    @InjectMocks
    private ProductService service;

    @Test
    void testGuardarProducto() {
        Product producto = new Product(1L, "Lechuga", "Orgánica", 1500.0, "Verdura", true, 20, "url.png");

        when(repository.save(producto)).thenReturn(producto);

        Product resultado = service.save(producto);

        assertNotNull(resultado);
        assertEquals("Lechuga", resultado.getNombre());
        verify(repository, times(1)).save(producto);
    }

    @Test
    void testBuscarPorId() {
        Product producto = new Product(1L, "Tomate", "Rojo", 1000.0, "Verdura", true, 15, "url2.png");

        when(repository.findById(1L)).thenReturn(Optional.of(producto));

        Product resultado = service.getById(1L);

        assertNotNull(resultado);
        assertEquals("Tomate", resultado.getNombre());
        verify(repository, times(1)).findById(1L);
    }

    @Test
    void eliminarProducto() {

        Long id = 2L;

        service.delete(id);
        verify(repository, times(1)).deleteById(id);

    }

    @Test
    void actualizarProducto() {
        Long id = 1L;



        Product original = new Product(id, "TomateOriginal", "Rojo", 1000.0, "Verdura", true, 15, "url2.png");
        Product actualizada = new Product(id, "TomateActualizado", "Rojo", 1000.0, "Verdura", true, 15, "url2.png");

        when(repository.findById(id)).thenReturn(Optional.of(original));
        when(repository.save(any(Product.class))).thenReturn(actualizada);

        Product resultado = service.updateProduct(id, actualizada);

        assertNotNull(resultado);
        assertEquals("Rojo", resultado.getDescripcion());
        assertEquals("TomateActualizado", resultado.getNombre());
        verify(repository, times(1)).findById(id);
        verify(repository, times(1)).save(original);
    }
}