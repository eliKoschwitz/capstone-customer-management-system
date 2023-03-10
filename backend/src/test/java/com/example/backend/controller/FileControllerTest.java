package com.example.backend.controller;

import com.example.backend.model.FileMetadata;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class FileControllerTest {

    @Autowired
    private MockMvc mvc;

    @Test
    void whenPostFile_returnMetadataFromFile() throws Exception {
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

        MockMultipartFile mockMultipartFile = new MockMultipartFile("file", "filename.txt",
                "multipart/form-data", "some xml".getBytes());

        String fileMetadataJSON = """
                {
                    "name": "filename.txt",
                    "headline": "thisIsTheHeadline",
                    "contentType": "multipart/form-data",
                    "size": 8,
                    "createdBy": "63d1388c30c8f00af04e009c"
                }
                """;

        String headline = "thisIsTheHeadline";

        mvc.perform(MockMvcRequestBuilders.multipart("/api/files")
                        .file(mockMultipartFile)
                        .param("headline", headline)
                        .with(httpBasic("Elias", "user"))
                        .header(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON)
                        .header(HttpHeaders.CONTENT_TYPE, MediaType.MULTIPART_FORM_DATA))
                .andExpect(status().isOk())
                .andExpect(content().json(fileMetadataJSON));
    }

    @Test
    void whenPostFile_withoutLogin_return401() throws Exception {
        MockMultipartFile mockMultipartFile = new MockMultipartFile("file", "filename.txt",
                "multipart/form-data", "some xml".getBytes());

        String headline = "thisIsTheHeadline";

        mvc.perform(MockMvcRequestBuilders.multipart("/api/files")
                        .file(mockMultipartFile)
                        .param("headline", headline)
                        .with(httpBasic("Elias", "user"))
                        .header(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON)
                        .header(HttpHeaders.CONTENT_TYPE, MediaType.MULTIPART_FORM_DATA))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void whenPostFile_withWrongDeclarations_return400() throws Exception {

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

        String headline = "thisIsTheHeadline";

        mvc.perform(MockMvcRequestBuilders.multipart("/api/files")
                        .param("headline", headline)
                        .with(httpBasic("Elias", "user"))
                        .header(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON)
                        .header(HttpHeaders.CONTENT_TYPE, MediaType.MULTIPART_FORM_DATA))
                .andExpect(status().isBadRequest());
    }

    @Test
    void whenGetFile_returnMetadataFromFile() throws Exception {
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

        MockMultipartFile mockMultipartFile = new MockMultipartFile("file", "filename.txt",
                "multipart/form-data", "some xml".getBytes());

        String fileMetadataJSON = """
                {
                    "name": "filename.txt",
                    "headline": "thisIsTheHeadline",
                    "contentType": "multipart/form-data",
                    "size": 8,
                    "createdBy": "63d1388c30c8f00af04e009c"
                }
                """;

        // POST
        String headline = "thisIsTheHeadline";
        MvcResult result = mvc.perform(MockMvcRequestBuilders.multipart("/api/files")
                        .file(mockMultipartFile)
                        .param("headline", headline)
                        .with(httpBasic("Elias", "user"))
                        .header(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON)
                        .header(HttpHeaders.CONTENT_TYPE, MediaType.MULTIPART_FORM_DATA))
                .andExpect(status().isOk())
                .andExpect(content().json(fileMetadataJSON))
                .andReturn();


        String responseJson = result.getResponse().getContentAsString();

        FileMetadata metadata = new ObjectMapper().readValue(responseJson, FileMetadata.class);

        // GET
        mvc.perform(MockMvcRequestBuilders.get("/api/files/" + metadata.getId() + "/metadata")
                        .with(httpBasic("Elias", "user")))
                .andExpect(status().isOk())
                .andExpect(content().json(fileMetadataJSON));
    }

}