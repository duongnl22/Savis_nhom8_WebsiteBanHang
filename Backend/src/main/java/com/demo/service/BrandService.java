package com.demo.service;

import com.demo.Repository.BrandDAO;
import com.demo.entity.Brand;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Service
public class BrandService {
    @Autowired
    BrandDAO brandDAO;

    public List<Brand> getAll(){
        return brandDAO.findAll();
    };

    public Brand add(String thuongHieu){
        Brand brand = new Brand();
        brand.setName(thuongHieu);
        return brandDAO.save(brand);
    }
}
