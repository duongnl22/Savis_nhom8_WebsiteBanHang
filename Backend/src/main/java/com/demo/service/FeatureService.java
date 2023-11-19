package com.demo.service;

import com.demo.Repository.FeatureDAO;
import com.demo.entity.Feature;
import com.demo.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeatureService {
    @Autowired
    FeatureDAO featureDAO;

    public List<Feature> getAll(){
        return featureDAO.findAll();
    };

    public Feature addExcel(String product){
        Feature brand = new Feature();
        brand.setName(product);
        return featureDAO.save(brand);
    }
}
