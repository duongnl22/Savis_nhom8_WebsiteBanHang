package com.demo.service;

import com.demo.Repository.GenderDAO;
import com.demo.entity.Gender;
import com.demo.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GenderService {
    @Autowired
    GenderDAO genderDAO;

    public List<Gender> getAll(){
        return genderDAO.findAll();
    };

    public Gender addExcel(String product){
        Gender brand = new Gender();
        brand.setName(product);
        return genderDAO.save(brand);
    }
}
