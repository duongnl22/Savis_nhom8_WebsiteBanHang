package com.demo.controller;

import com.demo.service.ShapeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/shape")
public class ShapeController {
    @Autowired
    ShapeService shapeService;

    @GetMapping
    public ResponseEntity<?> getAll(){
        return ResponseEntity.ok(shapeService.getAll());
    }

    @PostMapping("/addExcel")
    public ResponseEntity<?> addProductExcel(@RequestBody String product){
        return ResponseEntity.ok(shapeService.addExcel(product));
    }
}