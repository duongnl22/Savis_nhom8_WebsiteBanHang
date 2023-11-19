package com.demo.controller;

import com.demo.service.CaseMaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/casematerial")
public class CaseMaterialController {
    @Autowired
    CaseMaterialService caseMaterialService;

    @GetMapping
    public ResponseEntity<?> getAll(){
        return ResponseEntity.ok(caseMaterialService.getAll());
    }

    @PostMapping("/addExcel")
    public ResponseEntity<?> addProductExcel(@RequestBody String product){
        return ResponseEntity.ok(caseMaterialService.addExcel(product));
    }
}
