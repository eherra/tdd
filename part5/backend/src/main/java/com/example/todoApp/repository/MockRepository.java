package com.example.todoApp.repository;

import com.example.todoApp.model.Todo;
import com.example.todoApp.model.requests.UpdateTodoRequest;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

// mock class for DB
@Component
public class MockRepository {

    public Todo getOne() {
        return Todo.builder()
                .description("Mock Task")
                .isCompleted(false)
                .build();
    }

    public List<Todo> getAll() {
        final List<Todo> mockList = new ArrayList<>();
        mockList.add(Todo.builder()
                        .description("Mock Task 1")
                        .isCompleted(false)
                        .build());

        mockList.add(Todo.builder()
                        .description("Mock Task 2")
                        .isCompleted(true)
                        .build());

        mockList.add(Todo.builder()
                        .description("Mock Task 3")
                        .isCompleted(true)
                        .build());

        return mockList;
    }

    public void addTodo(final String description) {
        final Todo createdTodo = Todo.builder()
                .description(description)
                .isCompleted(false)
                .build();

        // returns generatedId?
    }

    public void markTodoCompleted(final String todoId) {
        // use mongoTemplate and set by ID completed
    }

    public void renameTodo(final UpdateTodoRequest updateTodoRequest) {
        // use mongoTemplate and set by ID completed
    }
}
