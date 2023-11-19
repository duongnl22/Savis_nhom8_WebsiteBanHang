package com.demo.controller;

import com.demo.entity.Brand;
import com.demo.service.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/brand")
public class BrandController {
    @Autowired
    BrandService brandService;

    @GetMapping
    public ResponseEntity<?> getAll(){
        return ResponseEntity.ok(brandService.getAll());
    }
//
    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody String brand){
        return ResponseEntity.ok(brandService.add(brand));
    }
}
