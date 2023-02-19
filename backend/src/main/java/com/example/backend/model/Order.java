package com.example.backend.model;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Order {
    private String id;
    @NotEmpty
    private String customerId;
    @NotEmpty
    private String website;
    private LocalDate endTime;
    private String description;
    private List<String> fileIds;
    private String createdBy;
}
