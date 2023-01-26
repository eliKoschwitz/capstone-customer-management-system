package com.example.backend.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class CustomerControllerTest {

    @Autowired
    private MockMvc mvc;
    @Autowired
    private AppUserController appUserController;

    @Test
    void getAll_returns401WhenNotLoggedIn () throws Exception {
        mvc.perform(MockMvcRequestBuilders.get("/api/customer"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(username = "Elias", password = "user")
    void whenGetAllCustomers_withNoCustomersAdded_returnsEmptyList () throws Exception {
        // ADD APP-USER
        String requestBody = """
            {
                "id": "63d1388c30c8f00af04e009c",
                "username":"Elias",
                "password":"user"
            }
            """;

        String expectedJSON = """
            {
                "id": "63d1388c30c8f00af04e009c",
                "username": "Elias",
                "password": "",
                "role": "BASIC"
            }
            """;
        // App User erstellen
        mvc.perform(MockMvcRequestBuilders.post("/api/app-users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isOk())
                .andExpect(content().json(expectedJSON));
        // GET CUSTOMER MUST BE EMPTY []
        mvc.perform(MockMvcRequestBuilders.get("/api/customer"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]", true));
    }


    @Test
    @WithMockUser(username = "Elias", password = "user", roles = "BASIC")
    void whenGetAllCustomers_withCustomerAdded_returnsCustomer () throws Exception {
        // Add App-User
        String requestBody = """
            {
                "id": "63d1388c30c8f00af04e009c",
                "username":"Elias",
                "password":"user"
            }
            """;

        String expectedJSON = """
            {
                "id": "63d1388c30c8f00af04e009c",
                "username": "Elias",
                "password": "",
                "role": "BASIC"
            }
            """;

        mvc.perform(MockMvcRequestBuilders.post("/api/app-users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody))
                .andExpect(status().isOk())
                .andExpect(content().json(expectedJSON));

        // Add Customer
        String customerJSON = """  
            {
                "id": "1234",
                 "firstName":"Vanessa",
                 "lastName":"Riedel",
                 "telefonNr":"090000000",
                 "email":"v.riedel",
                 "createdBy": "63d1388c30c8f00af04e009c"
             }
            """;

        String expectedCustomerJSON = """  
            [{
                 "id": "1234",
                 "firstName":"Vanessa",
                 "lastName":"Riedel",
                 "telefonNr":"090000000",
                 "email":"v.riedel",
                 "createdBy": "63d1388c30c8f00af04e009c"
             }]
            """;

        // ADD CUSTOMER
        mvc.perform(MockMvcRequestBuilders.post("/api/customer")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(customerJSON))
                .andExpect(status().isOk())
                .andExpect(content().json(customerJSON));

        // GET CUSTOMER MUST BE [1]CUSTOMER
        mvc.perform(MockMvcRequestBuilders.get("/api/customer"))
                .andExpect(status().isOk())
                .andExpect(content().json(expectedCustomerJSON, true));
    }

    @Test
    @WithMockUser(username = "Elias", password = "user", roles = "BASIC")
    void whenDeleteCustomer_withOneCustomer_returnsEmptyList() throws Exception {
        // Add App-User
        String requestAppUser = """
            {
                "id": "63d1388c30c8f00af04e009c",
                "username":"Elias",
                "password":"user"
            }
            """;

        String expectedAppUser = """
            {
                "id": "63d1388c30c8f00af04e009c",
                "username": "Elias",
                "password": "",
                "role": "BASIC"
            }
            """;

        mvc.perform(MockMvcRequestBuilders.post("/api/app-users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestAppUser))
                .andExpect(status().isOk())
                .andExpect(content().json(expectedAppUser));

        String requestCustomer = """  
            {
                "id": "1234",
                 "firstName":"Vanessa",
                 "lastName":"Riedel",
                 "telefonNr":"090000000",
                 "email":"v.riedel",
                 "createdBy": "63d1388c30c8f00af04e009c"
             }
            """;

        String expectedCustomer = """  
            {
                 "id": "1234",
                 "firstName":"Vanessa",
                 "lastName":"Riedel",
                 "telefonNr":"090000000",
                 "email":"v.riedel",
                 "createdBy": "63d1388c30c8f00af04e009c"
             }
            """;

        mvc.perform(MockMvcRequestBuilders.post("/api/customer")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestCustomer))
                .andExpect(status().isOk())
                .andExpect(content().json(expectedCustomer));

        mvc.perform(MockMvcRequestBuilders.delete("/api/customer/"+"1234"))
                .andExpect(status().isOk());

        mvc.perform(MockMvcRequestBuilders.get("/api/customer"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));

    }


}