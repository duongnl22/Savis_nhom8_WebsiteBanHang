package com.demo.controller;

import com.demo.service.GenderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin("*")
@RestController
@RequestMapping("/api/gender")
public class GenderController {
    @Autowired
    GenderService genderService;

    @GetMapping
    public ResponseEntity<?> getAll(){
        return ResponseEntity.ok(genderService.getAll());
    }

    @PostMapping("/addExcel")
    public ResponseEntity<?> addProductExcel(@RequestBody String product){
        return ResponseEntity.ok(genderService.addExcel(product));
    }
}