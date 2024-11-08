package com.biswa.inventory_service.controller;

import com.biswa.inventory_service.model.Product;
import com.biswa.inventory_service.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/inventory")
public class InventoryController {

    @Autowired
    ProductRepository productRepository;

    @GetMapping("/list")
    public List<Product> getAllProduct(){
        return productRepository.findAll();
    }

    @PostMapping("/add")
    public ResponseEntity<Product> addProduct(@RequestBody Product product){
        System.out.println(product.toString());
        Product createdProduct = productRepository.save(product);
        return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);

    }
}
