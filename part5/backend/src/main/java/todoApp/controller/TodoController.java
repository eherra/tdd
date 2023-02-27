package todoApp.controller;

import todoApp.service.TodoFacade;
import todoApp.model.requests.AddTodoRequest;
import todoApp.model.Todo;
import todoApp.model.requests.UpdateTodoRequest;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
public class TodoController {

    @Autowired
    private TodoFacade todoFacade;

    @GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Todo> getTodos() {
        return todoFacade.getAll();
    }

    @PostMapping("/add-todo")
    @ResponseStatus(HttpStatus.CREATED)
    public Todo addTodo(@RequestBody @Valid
                            final AddTodoRequest addTodoRequest) {
        return todoFacade.addTodo(addTodoRequest.getDescription());
    }

    @PutMapping("/completed/{todoId}")
    public void markCompleted(@PathVariable @NotNull
                                  final String todoId,
                              @RequestParam(value = "isCompleted")
                                  final boolean isCompleted) {
        todoFacade.markTodoCompleted(todoId, isCompleted);
    }

    @PutMapping("/rename-todo")
    public void renameTodo(@RequestBody @Valid
                               final UpdateTodoRequest updateTodoRequest) {
        todoFacade.renameTodo(updateTodoRequest);
    }
}
