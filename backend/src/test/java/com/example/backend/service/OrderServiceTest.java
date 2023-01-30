package com.example.backend.service;

import com.example.backend.model.AppUser;
import com.example.backend.model.Order;
import com.example.backend.repository.OrderRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;

class OrderServiceTest {

    @Test
    void whenGetAllOrders_withNoOrder_returnEmptyList() {
        // GIVEN
        AppUser appUser = new AppUser("1", "Elias", "user", "BASIC");

        OrderRepository mockOrderRepository = mock(OrderRepository.class);
        AppUserService mockAppUserService = mock(AppUserService.class);
        OrderService orderService = new OrderService(mockOrderRepository,mockAppUserService);

        Order order = new Order("1", "12345", "AutoWebsite", "01.02.2021",
                "04.02.2023", "That is the description","1");
        List<Order> orderList = new ArrayList<>(List.of(order));

        Mockito.when(mockAppUserService.getAuthenticatedUser()).thenReturn(appUser);
        Mockito.when(mockOrderRepository.findAllByCreatedBy("1")).thenReturn(orderList);

        // WHEN
        List<Order> actual = orderService.findAllOrders();
        // THEN
        Assertions.assertEquals(orderList, actual);

        verify(mockAppUserService).getAuthenticatedUser();
        verify(mockOrderRepository).findAllByCreatedBy("1");
    }

    @Test
    void whenGetAllOrder_orderListIsEmpty_thenReturnEmptyList() {
        // GIVEN
        AppUser appUser = new AppUser("1", "Elias", "user", "BASIC");
        List<Order> orderList = new ArrayList<>();

        OrderRepository mockOrderRepository = mock(OrderRepository.class);
        AppUserService mockAppUserService = mock(AppUserService.class);
        OrderService orderService = new OrderService(mockOrderRepository,mockAppUserService);

        Mockito.when(mockAppUserService.getAuthenticatedUser()).thenReturn(appUser);
        Mockito.when(orderService.findAllOrders()).thenReturn(orderList);

        // WHEN
        List<Order> actual = orderService.findAllOrders();
        List<Order> expected = new ArrayList<>();

        // THEN
        Assertions.assertEquals(actual, expected);

        verify(mockOrderRepository).findAllByCreatedBy("1");
    }

    @Test
    void whenCreateOrder_thenReturnOrder() {
        // GIVEN
        AppUser appUser = new AppUser("1", "Elias", "user", "BASIC");

        Order order = new Order("1", "12345", "AutoWebsite", "01.02.2021",
                "04.02.2023", "That is the description","1");

        OrderRepository mockOrderRepository = mock(OrderRepository.class);
        AppUserService mockAppUserService = mock(AppUserService.class);
        OrderService orderService = new OrderService(mockOrderRepository,mockAppUserService);

        Mockito.when(mockAppUserService.getAuthenticatedUser()).thenReturn(appUser);
        Mockito.when(mockOrderRepository.save(order)).thenReturn(order);

        // WHEN
        Order actual = orderService.create(order);

        // THEN
        Assertions.assertEquals(order, actual);

        // VERIFY
        verify(mockOrderRepository).save(order);
    }

    @Test
    void whenDeleteOrder_withCustomerAdded_thenReturnVoid() {
        // GIVEN
        OrderRepository mockOrderRepository = mock(OrderRepository.class);
        AppUserService mockAppUserService = mock(AppUserService.class);
        OrderService orderService = new OrderService(mockOrderRepository, mockAppUserService);

        Mockito.doNothing().when(mockOrderRepository).deleteById("1");

        // WHEN
        orderService.deleteByID("1");

        // THEN & VERIFY
        verify(mockOrderRepository).deleteById("1");
    }

    @Test
    void whenGetOrderById_returnTheOrderWithId(){
        // GIVEN
        Order expectedOrder = new Order("1234","Customer1","Website1","startTime",
                "endTime","description","1");
        OrderRepository mockOrderRepository = mock(OrderRepository.class);
        AppUserService mockAppUserService = mock(AppUserService.class);
        OrderService orderService = new OrderService(mockOrderRepository, mockAppUserService);

        Mockito.when(mockOrderRepository.findById("1234")).thenReturn(Optional.of(expectedOrder));
        // WHEN
        Optional<Order> actual = orderService.getOrderById("1234");
        // THEN
        Assertions.assertEquals(Optional.of(expectedOrder),actual);
    }
}