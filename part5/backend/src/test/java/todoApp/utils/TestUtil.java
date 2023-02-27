package todoApp.utils;

import todoApp.model.requests.AddTodoRequest;
import todoApp.model.Todo;
import todoApp.model.requests.UpdateTodoRequest;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.ArrayList;
import java.util.List;

public class TestUtil {

    private static final String SINGLE_TODO_NAME = "Single Test Mock 1";
    private static final String TODO_TEST_NAME_1 = "Test Mock 1";
    private static final String TODO_TEST_NAME_2 = "Test Mock 2";
    private static final String TODO_TEST_NAME_3 = "Test Mock 3";


    public static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
    public static AddTodoRequest createAddTodoRequest(final String description) {
        return AddTodoRequest.builder()
                .description(description)
                .build();
    }

    public static UpdateTodoRequest createUpdateTodoRequest(final String todoId, final String newDescription) {
        return UpdateTodoRequest.builder()
                .id(todoId)
                .newDescription(newDescription)
                .build();
    }

    public static List<Todo> createTodosList() {
        final List<Todo> mockList = new ArrayList<>();
        mockList.add(Todo.builder()
                .id("1")
                .description(TODO_TEST_NAME_1)
                .isCompleted(false)
                .build());

        mockList.add(Todo.builder()
                .id("2")
                .description(TODO_TEST_NAME_2)
                .isCompleted(true)
                .build());

        mockList.add(Todo.builder()
                .id("3")
                .description(TODO_TEST_NAME_3)
                .isCompleted(true)
                .build());

        return mockList;
    }
}
