package com.demo.service;

import com.demo.Repository.AccountDAO;
import com.demo.Repository.OrderDAO;
import com.demo.entity.Account;
import com.demo.entity.Order;
import com.demo.entity.WatchDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class OrderService {
    @Autowired
    OrderDAO orderDAO;

    @Autowired
    AccountDAO accountDAO;

    public List<Order> getAll(){
        return orderDAO.findAll();
    };

    public Order add(Order order){
        return orderDAO.save(order);
    }

    public List<Order> getOrderforAccount(UUID idaccount){
        Account account = accountDAO.findById(idaccount).get();
        List<Order> listorder = account.getOrder();
        for (Order ord:listorder){
            System.out.println(ord.getTotal_money());
        }
        return listorder;
    }

    public Order updateStatus(UUID idorder){
        Order order = orderDAO.findById(idorder).get();
        order.setStatus(1);
        return orderDAO.save(order);
    }

    public Order updateStatusgiaohang(UUID idorder){
        Order order = orderDAO.findById(idorder).get();
        order.setStatus(2);
        return orderDAO.save(order);
    }
}
