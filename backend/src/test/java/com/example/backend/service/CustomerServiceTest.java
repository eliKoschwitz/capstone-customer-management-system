package com.example.backend.service;

import com.example.backend.model.AppUser;
import com.example.backend.model.Customer;
import com.example.backend.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.*;

@RequiredArgsConstructor
class CustomerServiceTest {

    @Test
    void whenGetAllCustomer_addCustomer_thenReturnCustomer() {
        //GIVEN
        AppUser appUser = new AppUser("1", "Elias", "user", "BASIC");

        CustomerRepository mockCustomerRepository = mock(CustomerRepository.class);
        AppUserService mockAppUserService = mock(AppUserService.class);
        CustomerService customerService = new CustomerService(mockAppUserService, mockCustomerRepository);

        Customer customer = new Customer("1", "Elias", "Koschwitz", "015124242424", "e.koschwitz", "12");
        List<Customer> customerList = new ArrayList<>(List.of(customer));

        Mockito.when(mockAppUserService.getAuthenticatedUser()).thenReturn(appUser);
        Mockito.when(mockCustomerRepository.findAllByCreatedBy("1")).thenReturn(customerList);

        //WHEN
        List<Customer> actual = customerService.findAllCustomer();
        //THEN
        Assertions.assertEquals(customerList, actual);

        verify(mockAppUserService).getAuthenticatedUser();
        verify(mockCustomerRepository).findAllByCreatedBy("1");
    }

    @Test
    void whenGetAllCustomer_CustomerListIsEmpty_thenReturnEmptyList() {
        // GIVEN
        AppUser appUser = new AppUser("1", "Elias", "user", "BASIC");
        List<Customer> customerList = new ArrayList<>();

        CustomerRepository mockCustomerRepository = mock(CustomerRepository.class);
        AppUserService mockAppUserService = mock(AppUserService.class);
        CustomerService customerService = new CustomerService(mockAppUserService, mockCustomerRepository);

        Mockito.when(mockAppUserService.getAuthenticatedUser()).thenReturn(appUser);
        Mockito.when(customerService.findAllCustomer()).thenReturn(customerList);

        // WHEN
        List<Customer> actual = customerService.findAllCustomer();
        List<Customer> expected = new ArrayList<>();

        // THEN
        Assertions.assertEquals(actual, expected);

        //verify(mockAppUserService).getAuthenticatedUser();
        verify(mockCustomerRepository).findAllByCreatedBy("1");
    }

    @Test
    void whenCreateCustomer_thenReturnCustomer() {
        // GIVEN
        AppUser appUser = new AppUser("1", "Elias", "user", "BASIC");

        Customer customer = new Customer("1", "Elias", "Koschwitz", "015124242424"
                , "e.koschwitz", "12");

        CustomerRepository mockCustomerRepository = mock(CustomerRepository.class);
        AppUserService mockAppUserService = mock(AppUserService.class);
        CustomerService customerService = new CustomerService(mockAppUserService, mockCustomerRepository);

        Mockito.when(mockAppUserService.getAuthenticatedUser()).thenReturn(appUser);
        Mockito.when(mockCustomerRepository.save(customer)).thenReturn(customer);

        // WHEN
        Customer actual = customerService.create(customer);

        // THEN
        Assertions.assertEquals(customer, actual);

        // VERIFY
        verify(mockCustomerRepository).save(customer);
    }


    @Test
    void whenDeleteCustomer_withCustomerAdded_thenReturnVoid() {
        // GIVEN
        CustomerRepository mockCustomerRepository = mock(CustomerRepository.class);
        AppUserService mockAppUserService = mock(AppUserService.class);
        CustomerService customerService = new CustomerService(mockAppUserService, mockCustomerRepository);

        Mockito.doNothing().when(mockCustomerRepository).deleteById("1");

        // WHEN
        customerService.deleteByID("1");

        // THEN & VERIFY
        verify(mockCustomerRepository).deleteById("1");
    }
}