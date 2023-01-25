package com.example.backend.service;

import com.example.backend.model.Customer;
import com.example.backend.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.List;

import static org.mockito.Mockito.verify;

@RequiredArgsConstructor
class CustomerServiceTest {

    @Test
    void findAllCustomer() {
        //GIVEN
        AppUserService mockAppUserService = Mockito.mock(AppUserService.class);
        CustomerRepository mockCustomerRepository = Mockito.mock(CustomerRepository.class);
        CustomerService customerService = new CustomerService(mockAppUserService, mockCustomerRepository);
        Customer customer = new Customer("1","Elias","Koschwitz","015124242424","e.koschwitz","12");

        Mockito.when(mockAppUserService.getAuthenticatedUser().getId()).thenReturn("12");
        CustomerRepository mockRepo = Mockito.mock(CustomerRepository.class);
        Mockito.when(mockRepo.findAllByCreatedBy("12")).thenReturn(List.of(customer));
        //WHEN
        List<Customer> customerList = customerService.findAllCustomer();
        //THEN
        Assertions.assertEquals(List.of(customer), customerList);

        verify(mockRepo).findAllByCreatedBy("12");
    }
    /*
    @Test
    void deleteByID() {
        CustomerRepository mockCustomerRepository = Mockito.mock(CustomerRepository.class);
        // WHEN
        Mockito.when(mockCustomerRepository.deleteById("1")).thenReturn();
    }

     */

    @Test
    void create() {
    }
}