package com.example.backend.config;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class ValidationAdviceTest {

    @Autowired
    private MockMvc mvc;

    @Test
    void whenCreateUser_andAppUserDoesExit_thenReturnConflict() throws Exception {

        String requestBody = """
                {
                    "username":"",
                    "password":""
                }
                """;

        String expectedJSON = """
                {
                    "password": "must not be empty",
                    "username": "must not be empty"
                }
                """;

        mvc.perform(MockMvcRequestBuilders.post("/api/app-users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpectAll(
                        MockMvcResultMatchers.status().isBadRequest(),
                        MockMvcResultMatchers.content().json(expectedJSON));
    }
}