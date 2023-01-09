package com.example.todoApp.controller;

import com.example.todoApp.facade.TodoFacade;
import com.example.todoApp.model.requests.AddTodoRequest;
import com.example.todoApp.model.Todo;
import com.example.todoApp.model.requests.UpdateTodoRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
public class TodoController {

    @Autowired
    private TodoFacade todoFacade;

    @GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Todo> getTodos() {
        return todoFacade.getAll();
    }

    @GetMapping(value = "/one", produces = MediaType.APPLICATION_JSON_VALUE)
    public Todo getOne() {
        return todoFacade.getOne();
    }

    @PostMapping("/add-todo")
    @ResponseStatus(HttpStatus.CREATED)
    public void addTodo(@RequestBody @Valid
                            final AddTodoRequest addTodoRequest) {
        todoFacade.addTodo(addTodoRequest.getDescription());
    }

    @PutMapping("/completed/{todoId}")
    public void markCompleted(@PathVariable @NotNull
                                  final String todoId) {
        todoFacade.markTodoCompleted(todoId);
    }

    @PutMapping("/rename-todo")
    public void renameTodo(@RequestBody @Valid
                               final UpdateTodoRequest updateTodoRequest) {
        todoFacade.renameTodo(updateTodoRequest);
    }
}
