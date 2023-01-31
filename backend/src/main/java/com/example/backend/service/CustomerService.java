package com.example.backend.service;

import com.example.backend.model.AppUser;
import com.example.backend.model.Customer;
import com.example.backend.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final AppUserService appUserService;
    private final CustomerRepository customerRepository;

    public List<Customer> findAllCustomer() {
        String userID  = appUserService.getAuthenticatedUser().getId();
        return customerRepository.findAllByCreatedBy(userID);
    }

    public void deleteByID(String id) {
        customerRepository.deleteById(id);
    }

    public Customer create(Customer customer) {
        AppUser user = appUserService.getAuthenticatedUser();
        customer.setCreatedBy(user.getId());
        return customerRepository.save(customer);
    }

    public Optional<Customer> getCustomerById(String id) {
        return customerRepository.findById(id);
    }
}
