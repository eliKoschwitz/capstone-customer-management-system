package com.example.backend.controller;


import com.example.backend.model.AppUser;
import com.example.backend.repository.AppUserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class AppUserControllerTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private AppUserRepository appUserRepository;

    // CREATE
    @Test
    void whenCreateUser_getBackSameUser() throws Exception {
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
    }

    @Test
    void whenCreateUser_andAppUserDoesExit_thenReturnConflict() throws Exception {
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
                .andExpectAll(
                        MockMvcResultMatchers.status().isOk(),
                        MockMvcResultMatchers.content().json(expectedJSON));

        mvc.perform(MockMvcRequestBuilders.post("/api/app-users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpectAll(MockMvcResultMatchers.status().isConflict());
    }

    // LOGIN
    @Test
    @WithMockUser(username = "Elias", password = "user")
    void whenLogin_get200AndSameUsername() throws Exception {
        String expectedJSON = """
                {
                    "id": "flappDoodle",
                    "username": "Elias",
                    "password": "",
                    "role": "BASIC"
                }
                """;
        appUserRepository.save(new AppUser("flappDoodle", "Elias", "user", "BASIC"));

        mvc.perform(MockMvcRequestBuilders.post("/api/app-users/login"))
                .andExpect(status().isOk())
                .andExpect(content().json(expectedJSON));
    }

    @Test
    void whenLogin_AppUserDoesNotExist_thenReturn401() throws Exception {
        mvc.perform(MockMvcRequestBuilders.post("/api/app-users/login"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(username = "Elias", password = "user")
    void whenLogin_AppUserExists_thenReturn200() throws Exception {
        mvc.perform(MockMvcRequestBuilders.post("/api/app-users/login"))
                .andExpectAll(MockMvcResultMatchers.status().isOk());
    }

    // ME ENDPUNKT
    @Test
    void me_whenAppUserNotLoggedIn_thenReturn401() throws Exception {
        mvc.perform(MockMvcRequestBuilders.get("/api/app-users/me")).
                andExpectAll(MockMvcResultMatchers.status().isUnauthorized()
                );
    }

    @Test
    @WithMockUser(username = "Elias", password = "user")
    void me_whenAppUserLoggedIn_thenReturn200() throws Exception {
        mvc.perform(MockMvcRequestBuilders.get("/api/app-users/me")).
                andExpectAll(MockMvcResultMatchers.status().isOk()
                );
    }

    // LOGOUT
    @Test
    @WithMockUser(username = "Elias", roles = "BASIC")
    void whenLogout_appUser_return200() throws Exception {
        mvc.perform(MockMvcRequestBuilders.get("/api/app-users/logout"))
                .andExpectAll(MockMvcResultMatchers.status().isOk()
                );
    }

    @Test
    void whenLogout_withNoAppUser_return401() throws Exception {
        mvc.perform(MockMvcRequestBuilders.get("/api/app-users/logout"))
                .andExpectAll(MockMvcResultMatchers.status().isUnauthorized()
                );
    }
}