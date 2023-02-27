package todoApp.service.impl;

import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import todoApp.model.Todo;
import todoApp.model.requests.UpdateTodoRequest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import todoApp.repository.TodoRepository;

import java.util.List;

import static todoApp.utils.TestUtil.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@SpringBootTest
@ExtendWith(SpringExtension.class)
class TodoFacadeImplTest {
    private static final String TODO_ID = "123";
    private static final String MONDODB_GENERATED_ID = "random123qsdLWdq213";
    private static final String TODO_NAME = "new name";
    private static final String NEW_DESCRIPTION = "new description";

    @Autowired
    private TodoFacadeImpl todoFacadeImpl;

    @MockBean
    private TodoRepository mockTodoRepository;

    @Test
    @DisplayName("Returning all todos should work")
    void testGetAll() {
        final List<Todo> allTodosFromDb = createTodosList();
        when(mockTodoRepository.getAllTodos()).thenReturn(allTodosFromDb);
        final List<Todo> expectedTodos = todoFacadeImpl.getAll();

        assertEquals(expectedTodos, allTodosFromDb);
        verify(mockTodoRepository, times(1)).getAllTodos();
    }

    @Test
    @DisplayName("Creating todo should work")
    void testAddTodo() {
        final Todo todoToSave = Todo.builder()
                .description(TODO_NAME)
                .isCompleted(false)
                .build();

        final Todo dbResponseTodo = Todo.builder()
                .id(MONDODB_GENERATED_ID)
                .description(TODO_NAME)
                .isCompleted(false)
                .build();

        when(mockTodoRepository.saveTodo(any(Todo.class))).thenReturn(dbResponseTodo);
        final Todo expectedTodo = todoFacadeImpl.addTodo(TODO_NAME);
        assertEquals(expectedTodo, dbResponseTodo);
        verify(mockTodoRepository, times(1)).saveTodo(todoToSave);
    }

    @Test
    @DisplayName("Marking todo completed should work")
    void testMarkTodoCompleted() {
        doNothing().when(mockTodoRepository).updateComplete(anyString(), anyBoolean());
        todoFacadeImpl.markTodoCompleted(TODO_ID, true);
        verify(mockTodoRepository, times(1)).updateComplete(TODO_ID, true);
    }

    @Test
    @DisplayName("Renaming todo should work")
    void testRenameTodo() {
        final UpdateTodoRequest updateTodoRequest = createUpdateTodoRequest(TODO_ID, NEW_DESCRIPTION);
        doNothing().when(mockTodoRepository).renameTodo(anyString(), anyString());
        todoFacadeImpl.renameTodo(updateTodoRequest);
        verify(mockTodoRepository, times(1)).renameTodo(TODO_ID, NEW_DESCRIPTION);
    }
}