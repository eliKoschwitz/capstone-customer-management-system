package com.example.backend.service;

import com.example.backend.model.FileMetadata;
import com.mongodb.BasicDBObjectBuilder;
import com.mongodb.client.gridfs.model.GridFSFile;
import lombok.RequiredArgsConstructor;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsResource;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FileService {
    static final String CREATED_BY = "createdBy";

    private final GridFsTemplate gridFsTemplate;

    private final AppUserService appUserService;

    public FileMetadata saveFile (MultipartFile multipartFile, String headline) throws IOException {
        if (multipartFile.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "File is empty");
        }

        ObjectId objectId = gridFsTemplate.store(
                multipartFile.getInputStream(),
                multipartFile.getOriginalFilename(),
                multipartFile.getContentType(),
                BasicDBObjectBuilder.start()
                        .add(CREATED_BY, appUserService.getAuthenticatedUser().getId())
                        .add("headline", headline)
                        .get()
        );

        return getFileMetadata(objectId.toString());
    }

    public GridFsResource getResource(String id) {
        return gridFsTemplate.getResource(getFile(id));
    }

    public FileMetadata getFileMetadata (String id) {
        GridFSFile gridFSFile = getFile(id);

        Document metadata = Optional
                .ofNullable(gridFSFile.getMetadata())
                .orElse(new Document(Map.of(
                        "_contentType", "",
                        CREATED_BY, ""
                )));

        return new FileMetadata(
                id,
                gridFSFile.getFilename(),
                metadata.getString("headline"),
                metadata.getString("_contentType"),
                gridFSFile.getLength(),
                metadata.getString(CREATED_BY)
        );
    }

    public GridFSFile getFile(String id) {
        return Optional.ofNullable(
                gridFsTemplate.findOne(
                        Query.query(Criteria.where("_id").is(id))
                )
        ).orElseThrow(
                () -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "File not found"
                )
        );
    }
}