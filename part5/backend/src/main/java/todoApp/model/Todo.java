package todoApp.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Builder;


@Data
@Builder
@Document(collection = "todos")
public class Todo {

    @Id
    @JsonProperty(value = "id")
    private String id;

    @NotNull
    @JsonProperty(value = "description")
    private String description;

    @JsonProperty(value = "isCompleted")
    private boolean isCompleted;
}