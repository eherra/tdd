package com.example.todoApp.facade;

import com.example.todoApp.model.Todo;
import com.example.todoApp.model.requests.UpdateTodoRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TodoFacade {

    Todo getOne();

    List<Todo> getAll();

    void addTodo(final String description);

    void markTodoCompleted(final String todoId);

    void renameTodo(final UpdateTodoRequest updateTodoRequest);

}
