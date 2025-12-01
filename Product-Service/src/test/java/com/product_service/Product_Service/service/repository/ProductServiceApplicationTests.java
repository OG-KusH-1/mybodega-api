package com.product_service.Product_Service.service.repository;

import com.product_service.Product_Service.model.Product;
import com.product_service.Product_Service.repository.ProductRepository;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
class ProductServiceApplicationTests {

	@Autowired
	private ProductRepository productRepository;

	@Test
	@Order(1)
	void guardarProducto() {

		Product producto = new Product(null, "Tomate", "Rojo", 1000.0, "Verdura", true, 15, "url2.png");
		Product guardado = productRepository.save(producto);

		Optional<Product> optionalProducto = productRepository.findById(guardado.getId());
		assertTrue(optionalProducto.isPresent());

		assertNotNull(optionalProducto.get().getId());
		assertEquals("Tomate", optionalProducto.get().getNombre());

	}

	@Test
	@Order(2)
	void buscarProductoPorId() {

		Product producto = new Product(null, "Lechuga", "verde", 1000.0, "Verdura", true, 15, "url2.png");
		producto = productRepository.save(producto);
		Long id = producto.getId();


		Optional<Product> optionalProducto = productRepository.findById(id);
		assertTrue(optionalProducto.isPresent());


		assertTrue(optionalProducto.isPresent());
		assertEquals("Lechuga", optionalProducto.get().getNombre());

	}

	@Test
	@Order(3)
	void actualizarProducto() {

		Product producto = new Product(null, "naranja", "naranjo", 1000.0, "Fruta", true, 15, "url2.png");
		producto = productRepository.save(producto);
		Long id = producto.getId();


		Optional<Product> optional = productRepository.findById(id);
		assertTrue(optional.isPresent());

		Product existente = optional.get();
		existente.setNombre("naranja actualizada");
		existente.setDescripcion("naranjita");

		Product actualizado = productRepository.save(existente);

		assertEquals("naranja actualizada", actualizado.getNombre());
		assertEquals("naranjita", actualizado.getDescripcion());
	}




	@Test
	@Order(4)
	void eliminarProducto() {

		Product producto = new Product(null, "manzana", "verde", 1000.0, "Verdura", true, 15, "url2.png");
		producto = productRepository.save(producto);
		Long id = producto.getId();



		assertTrue(productRepository.findById(id).isPresent());

		productRepository.deleteById(id);

		assertTrue(productRepository.findById(id).isEmpty());
	}


}