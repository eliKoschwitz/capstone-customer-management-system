package com.example.backend.controller;

import com.example.backend.model.Order;
import com.example.backend.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/order")
public class OrderController {

    private final OrderService orderService;

    @GetMapping
    public List<Order> findAllOrders() {
        return orderService.findAllOrders();
    }

    // ist auch die UpDate
    @PostMapping
    public Order saveOrder(@RequestBody Order order) {
        return orderService.create(order);
    }

    @DeleteMapping("/{id}")
    public void deleteOrderById(@PathVariable String id) {
        orderService.deleteByID(id);
    }

    @GetMapping("/{id}")
    public Optional<Order> getOrderById(@PathVariable String id) {
        return orderService.getOrderById(id);
    }
}
