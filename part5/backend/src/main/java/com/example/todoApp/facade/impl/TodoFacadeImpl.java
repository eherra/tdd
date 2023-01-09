package com.example.todoApp.facade.impl;

import com.example.todoApp.facade.TodoFacade;
import com.example.todoApp.model.Todo;
import com.example.todoApp.model.requests.UpdateTodoRequest;
import com.example.todoApp.repository.MockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoFacadeImpl implements TodoFacade {

    @Autowired
    private MockRepository mockRepository;

    @Override
    public Todo getOne() {
        return mockRepository.getOne();
    }

    @Override
    public List<Todo> getAll() {
        return mockRepository.getAll();
    }

    @Override
    public void addTodo(final String description) {
        mockRepository.addTodo(description);
    }

    @Override
    public void markTodoCompleted(final String todoId) {
        mockRepository.markTodoCompleted(todoId);
    }

    @Override
    public void renameTodo(final UpdateTodoRequest updateTodoRequest) {
        mockRepository.renameTodo(updateTodoRequest);
    }
}
