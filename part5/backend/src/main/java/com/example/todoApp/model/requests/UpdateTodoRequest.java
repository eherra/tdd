package com.example.todoApp.model.requests;

import com.fasterxml.jackson.annotation.JsonCreator;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UpdateTodoRequest {

    @NotNull
    private String id;

    @NotNull
    private String newDescription;

    @JsonCreator
    public UpdateTodoRequest(final String id, final String newDescription) {
        this.id = id;
        this.newDescription = newDescription;
    }
}
