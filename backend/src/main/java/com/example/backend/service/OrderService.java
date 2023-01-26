package com.example.backend.service;

import com.example.backend.model.Order;
import com.example.backend.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final AppUserService appUserService;

    public List<Order> findAllOrders() {
        String userID = appUserService.getAuthenticatedUser().getId();
        return orderRepository.findAllByCreatedBy(userID);
    }

    public void deleteByID(String id) {
        orderRepository.deleteById(id);
    }

    public Order create(Order order) {
        String user = appUserService.getAuthenticatedUser().getId();
        order.setCreatedBy(user);
        return orderRepository.save(order);
    }
}
