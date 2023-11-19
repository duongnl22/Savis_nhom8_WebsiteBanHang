package com.demo.controller;

import com.demo.entity.MachineType;
import com.demo.entity.Product;
import com.demo.service.MachineTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/dongmay")
public class MachineTypeController {
    @Autowired
    MachineTypeService machineTypeService;

    @GetMapping
    public ResponseEntity<?> getAll(){
        return ResponseEntity.ok(machineTypeService.getAll());
    }

    @PostMapping("/addExcel")
    public ResponseEntity<?> addProductExcel(@RequestBody String product){
        return ResponseEntity.ok(machineTypeService.addExcel(product));
    }
}
