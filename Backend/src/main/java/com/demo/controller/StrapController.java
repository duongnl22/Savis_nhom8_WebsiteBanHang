package com.demo.controller;

import com.demo.service.StrapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/strap")
public class StrapController {
    @Autowired
    StrapService strapService;

    @GetMapping
    public ResponseEntity<?> getAll(){
        return ResponseEntity.ok(strapService.getAll());
    }


    @PostMapping("/addExcel")
    public ResponseEntity<?> addProductExcel(@RequestBody String product){
        return ResponseEntity.ok(strapService.addExcel(product));
    }
}
