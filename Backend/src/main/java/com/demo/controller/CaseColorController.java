package com.demo.controller;

import com.demo.service.CaseColorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/casecolor")
public class CaseColorController {
    @Autowired
    CaseColorService caseColorService;

    @GetMapping
    public ResponseEntity<?> getAll(){
        return ResponseEntity.ok(caseColorService.getAll());
    }

    @PostMapping("/addExcel")
    public ResponseEntity<?> addProductExcel(@RequestBody String product){
        return ResponseEntity.ok(caseColorService.addExcel(product));
    }
}