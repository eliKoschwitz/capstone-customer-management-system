package com.example.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AppUser {
    private String id;
    @NotEmpty
    private String username;
    @NotEmpty
    private String password;
    private String role;
}
