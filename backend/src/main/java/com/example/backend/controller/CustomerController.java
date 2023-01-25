package com.example.backend.controller;

import com.example.backend.model.Customer;
import com.example.backend.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/customer")
public class CustomerController {

    private final CustomerService customerService;

    @GetMapping
    public List<Customer> findAllCustomers() {
        return customerService.findAllCustomer();
    }

    @PostMapping
    public Customer saveCustomer(@RequestBody Customer customer) {
        return customerService.create(customer);
    }

    @DeleteMapping("/{id}")
    public void deleteCustomerById(@PathVariable String id) {
        customerService.deleteByID(id);
    }
}