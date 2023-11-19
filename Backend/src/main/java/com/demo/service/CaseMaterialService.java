package com.demo.service;

import com.demo.Repository.CaseMaterialDAO;
import com.demo.entity.CaseMaterial;
import com.demo.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CaseMaterialService {
    @Autowired
    CaseMaterialDAO caseMaterialDAO;

    public List<CaseMaterial> getAll(){
        return caseMaterialDAO.findAll();
    };

    public CaseMaterial addExcel(String product){
        CaseMaterial brand = new CaseMaterial();
        brand.setName(product);
        return caseMaterialDAO.save(brand);
    }
}
