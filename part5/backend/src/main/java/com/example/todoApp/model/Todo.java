package com.example.todoApp.model;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Data
@Builder
@Document(collection = "Todos")
public class Todo {

    @Id
    private String id;

    @NotNull
    private String description;
    private boolean isCompleted;
}