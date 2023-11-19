package com.demo.controller;

import com.demo.service.SizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/size")
public class SizeController {
    @Autowired
    SizeService sizeService;

    @GetMapping
    public ResponseEntity<?> getAll(){
        return ResponseEntity.ok(sizeService.getAll());
    }

    @PostMapping("/addExcel")
    public ResponseEntity<?> addProductExcel(@RequestBody String product){
        return ResponseEntity.ok(sizeService.addExcel(product));
    }
}
