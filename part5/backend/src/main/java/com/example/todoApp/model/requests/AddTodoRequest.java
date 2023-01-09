package com.example.todoApp.model.requests;

import com.fasterxml.jackson.annotation.JsonCreator;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AddTodoRequest {

    @NotNull
    private String description;

    @JsonCreator
    public AddTodoRequest(String description) {
        this.description = description;
    }
}
