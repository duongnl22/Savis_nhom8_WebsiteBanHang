package com.demo.service;

import com.demo.Repository.CaseColorDAO;
import com.demo.entity.CaseColor;
import com.demo.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CaseColorService {
    @Autowired
    CaseColorDAO caseColorDAO;

    public List<CaseColor> getAll(){
        return caseColorDAO.findAll();
    };

    public CaseColor addExcel(String product){
        CaseColor brand = new CaseColor();
        brand.setName(product);
        return caseColorDAO.save(brand);
    }
}
