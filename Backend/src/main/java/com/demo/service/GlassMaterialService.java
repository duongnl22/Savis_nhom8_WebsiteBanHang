package com.demo.service;

import com.demo.Repository.GlassMaterialDAO;
import com.demo.entity.GlassMaterial;
import com.demo.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GlassMaterialService {
    @Autowired
    GlassMaterialDAO glassMaterialDAO;

    public List<GlassMaterial> getAll(){
        return glassMaterialDAO.findAll();
    };

    public GlassMaterial addExcel(String product){
        GlassMaterial brand = new GlassMaterial();
        brand.setName(product);
        return glassMaterialDAO.save(brand);
    }
}
