package com.example.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Customer {
    private String id;
    private String firstName;
    private String lastName;
    private String telefonNr;
    private String eMail;
    private String createdBy;
}
