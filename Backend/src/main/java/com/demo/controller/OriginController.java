package com.demo.controller;

import com.demo.service.OriginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/origin")
public class OriginController {
    @Autowired
    OriginService originService;

    @GetMapping
    public ResponseEntity<?> getAll(){
        return ResponseEntity.ok(originService.getAll());
    }


    @PostMapping("/addExcel")
    public ResponseEntity<?> addProductExcel(@RequestBody String product){
        return ResponseEntity.ok(originService.addExcel(product));
    }
}