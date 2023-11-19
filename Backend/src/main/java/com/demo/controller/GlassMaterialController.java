package com.demo.controller;

import com.demo.service.GlassMaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/chatlieukinh")
public class GlassMaterialController {
    @Autowired
    GlassMaterialService glassMaterialService;

    @GetMapping
    public ResponseEntity<?> getAll(){
        return ResponseEntity.ok(glassMaterialService.getAll());
    }

    @PostMapping("/addExcel")
    public ResponseEntity<?> addProductExcel(@RequestBody String product){
        return ResponseEntity.ok(glassMaterialService.addExcel(product));
    }
}