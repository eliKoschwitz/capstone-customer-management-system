package com.example.backend.model;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Order {
    private String id;
    private String customerId;
    private String website;
    private LocalDate startTime;
    private LocalDate endTime;
    private String description;
    private List<String> fileIds;
    private String createdBy;
}
