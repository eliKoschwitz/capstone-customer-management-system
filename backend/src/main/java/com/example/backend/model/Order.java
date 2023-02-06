package com.example.backend.model;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Order {
    private String id;
    private String customerId;
    private String website;
    private String startTime;
    private String endTime;
    private String description;
    private List<String> fileIds;
    private String createdBy;
}
