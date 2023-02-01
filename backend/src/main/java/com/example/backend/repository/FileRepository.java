package com.example.backend.repository;

import com.example.backend.model.FileMetadata;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FileRepository extends MongoRepository<FileMetadata, String> {
    FileMetadata fi(String id);
}
