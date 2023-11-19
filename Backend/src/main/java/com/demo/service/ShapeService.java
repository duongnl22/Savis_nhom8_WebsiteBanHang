package com.demo.service;

import com.demo.Repository.ShapeDAO;
import com.demo.entity.Product;
import com.demo.entity.Shape;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShapeService {
    @Autowired
    ShapeDAO shapeDAO;

    public List<Shape> getAll(){
        return shapeDAO.findAll();
    };

    public Shape addExcel(String product){
        Shape brand = new Shape();
        brand.setName(product);
        return shapeDAO.save(brand);
    }
}
