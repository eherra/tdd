package todoApp.model.requests;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AddTodoRequest {

    @NotNull
    @JsonProperty(value = "description")
    private String description;

    @JsonCreator
    public AddTodoRequest(String description) {
        this.description = description;
    }
}
