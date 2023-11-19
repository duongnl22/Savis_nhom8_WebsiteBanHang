package com.demo.service;

import com.demo.Repository.MachineTypeDAO;
import com.demo.entity.MachineType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MachineTypeService {
    @Autowired
    MachineTypeDAO machineTypeDAO;

    public List<MachineType> getAll(){
        return machineTypeDAO.findAll();
    };


    public MachineType addExcel(String product){
        MachineType brand = new MachineType();
        brand.setName(product);
        return machineTypeDAO.save(brand);
    }
}
