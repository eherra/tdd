package todoApp.service.impl;

import todoApp.repository.TodoRepository;
import todoApp.service.TodoFacade;
import todoApp.model.Todo;
import todoApp.model.requests.UpdateTodoRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoFacadeImpl implements TodoFacade {

    @Autowired
    private TodoRepository todoRepository;

    @Override
    public List<Todo> getAll() {
        return todoRepository.getAllTodos();
    }

    @Override
    public Todo addTodo(final String description) {
        final Todo todoToSave = Todo.builder()
                .description(description)
                .isCompleted(false)
                .build();
        return todoRepository.saveTodo(todoToSave);
    }

    @Override
    public void markTodoCompleted(final String todoId, final boolean isCompleted) {
        todoRepository.updateComplete(todoId, isCompleted);
    }

    @Override
    public void renameTodo(final UpdateTodoRequest updateTodoRequest) {
        todoRepository.renameTodo(updateTodoRequest.getId(), updateTodoRequest.getNewDescription());
    }
}
