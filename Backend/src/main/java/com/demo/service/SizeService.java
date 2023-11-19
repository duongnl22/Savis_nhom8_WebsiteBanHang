package com.demo.service;

import com.demo.Repository.SizeDAO;
import com.demo.entity.Product;
import com.demo.entity.Size;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SizeService {
    @Autowired
    SizeDAO sizeDAO;

    public List<Size> getAll(){
        return sizeDAO.findAll();
    };


    public Size addExcel(String product){
        Size brand = new Size();
        brand.setName(product);
        return sizeDAO.save(brand);
    }
}
