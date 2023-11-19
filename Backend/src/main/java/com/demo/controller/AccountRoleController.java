package com.demo.controller;

import com.demo.service.AccountRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/accountrole")
public class AccountRoleController {
    @Autowired
    AccountRoleService accountRoleService;

    @GetMapping
    public ResponseEntity<?> getAll(){
        return ResponseEntity.ok(accountRoleService.getAll());
    }
}
