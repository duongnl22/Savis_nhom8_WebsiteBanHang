package com.demo.controller;

import com.demo.service.FeatureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/feature")
public class FeatureController {
    @Autowired
    FeatureService featureService;

    @GetMapping
    public ResponseEntity<?> getAll(){
        return ResponseEntity.ok(featureService.getAll());
    }

    @PostMapping("/addExcel")
    public ResponseEntity<?> addProductExcel(@RequestBody String product){
        return ResponseEntity.ok(featureService.addExcel(product));
    }
}
