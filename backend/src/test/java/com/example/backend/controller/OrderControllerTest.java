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
class OrderControllerTest {

    @Autowired
    private MockMvc mvc;

    @Test
    void getAll_returns401WhenNotLoggedIn() throws Exception {
        mvc.perform(MockMvcRequestBuilders.get("/api/order"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(username = "Elias", password = "user")
    void whenGetAllOrder_withNoOrderAdded_returnsEmptyList() throws Exception {
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
        // Create App User
        mvc.perform(MockMvcRequestBuilders.post("/api/app-users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isOk())
                .andExpect(content().json(expectedJSON));
        // GET ORDER MUST BE EMPTY []
        mvc.perform(MockMvcRequestBuilders.get("/api/order"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]", true));
    }

    @Test
    @WithMockUser(username = "Elias", password = "user", roles = "BASIC")
    void whenGetAllOrder_withOrderAdded_returnsOrder() throws Exception {
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
        String requestOrder = """  
                {
                     "id": "1234",
                     "customerId":"customerId",
                     "website":"Bike Website",
                     "startTime":"10.01.2022",
                     "endTime":"20.01.2022",
                     "description":"The website should have two bla",
                     "createdBy":"63d1388c30c8f00af04e009c"
                 }
                """;

        String expectedOrder = """  
                [{
                     "id": "1234",
                     "customerId":"customerId",
                     "website":"Bike Website",
                     "startTime":"10.01.2022",
                     "endTime":"20.01.2022",
                     "description":"The website should have two bla",
                     "createdBy":"63d1388c30c8f00af04e009c"
                 }]
                """;

        // ADD Order
        mvc.perform(MockMvcRequestBuilders.post("/api/order")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestOrder))
                .andExpect(status().isOk())
                .andExpect(content().json(requestOrder));

        // GET CUSTOMER MUST BE [1]ORDER
        mvc.perform(MockMvcRequestBuilders.get("/api/order"))
                .andExpect(status().isOk())
                .andExpect(content().json(expectedOrder, true));
    }

    @Test
    @WithMockUser(username = "Elias", password = "user", roles = "BASIC")
    void whenDeleteOrder_withOneOrder_returnsEmptyList() throws Exception {
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

        // Add Customer
        String requestOrder = """  
                {
                     "id": "1234",
                     "customerId":"customerId",
                     "website":"Bike Website",
                     "startTime":"10.01.2022",
                     "endTime":"20.01.2022",
                     "description":"The website should have two bla",
                     "createdBy":"63d1388c30c8f00af04e009c"
                 }
                """;

        String expectedOrder = """  
                {
                     "id": "1234",
                     "customerId":"customerId",
                     "website":"Bike Website",
                     "startTime":"10.01.2022",
                     "endTime":"20.01.2022",
                     "description":"The website should have two bla",
                     "createdBy":"63d1388c30c8f00af04e009c"
                }
                """;

        mvc.perform(MockMvcRequestBuilders.post("/api/order")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestOrder))
                .andExpect(status().isOk())
                .andExpect(content().json(expectedOrder));

        mvc.perform(MockMvcRequestBuilders.delete("/api/order/" + "1234"))
                .andExpect(status().isOk());

        mvc.perform(MockMvcRequestBuilders.get("/api/order"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    @WithMockUser(username = "Elias", password = "user", roles = "BASIC")
    void whenGetOrderById_returnOrderWithTheId() throws Exception {

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

        // Add Customer
        String requestOrder = """  
                {
                     "id": "1234",
                     "customerId":"customerId",
                     "website":"Bike Website",
                     "startTime":"10.01.2022",
                     "endTime":"20.01.2022",
                     "description":"The website should have two bla",
                     "createdBy":"63d1388c30c8f00af04e009c"
                 }
                """;

        String expectedOrder = """  
                {
                     "id": "1234",
                     "customerId":"customerId",
                     "website":"Bike Website",
                     "startTime":"10.01.2022",
                     "endTime":"20.01.2022",
                     "description":"The website should have two bla",
                     "createdBy":"63d1388c30c8f00af04e009c"
                }
                """;

        mvc.perform(MockMvcRequestBuilders.post("/api/order")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestOrder))
                .andExpect(status().isOk())
                .andExpect(content().json(expectedOrder));

        mvc.perform(MockMvcRequestBuilders.get("/api/order/"+"1234"))
                .andExpect(status().isOk())
                .andExpect(content().json(expectedOrder));
    }

}