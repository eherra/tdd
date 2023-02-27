package todoApp.service;

import todoApp.model.Todo;
import todoApp.model.requests.UpdateTodoRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TodoFacade {

    List<Todo> getAll();

    Todo addTodo(final String description);

    void markTodoCompleted(final String todoId, final boolean isCompleted);

    void renameTodo(final UpdateTodoRequest updateTodoRequest);

}
