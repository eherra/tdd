package todoApp.model.requests;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UpdateTodoRequest {

    @NotNull
    @JsonProperty(value = "id")
    private String id;

    @NotNull
    @JsonProperty(value = "newDescription")
    private String newDescription;

    @JsonCreator
    public UpdateTodoRequest(final String id, final String newDescription) {
        this.id = id;
        this.newDescription = newDescription;
    }
}
