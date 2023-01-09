package com.example.todoApp.facade.impl;

import com.example.todoApp.model.Todo;
import com.example.todoApp.model.requests.UpdateTodoRequest;
import com.example.todoApp.repository.MockRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.List;

import static com.example.todoApp.utils.TestUtil.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@SpringBootTest
class TodoFacadeImplTest {
    private final static String TODO_ID = "123";
    private final static String TODO_NAME = "new name";
    private final static String NEW_DESCRIPTION = "new description";

    @Autowired
    private TodoFacadeImpl todoFacadeImpl;

    @MockBean
    private MockRepository mockRepository;

    @Test
    @DisplayName("Returning one Todo should workd")
    void testGetOne() {
        final Todo todoFromDb = createSingleTodo();
        when(mockRepository.getOne()).thenReturn(todoFromDb);
        final Todo expetedTodo = todoFacadeImpl.getOne();

        assertEquals(expetedTodo, todoFromDb);
        verify(mockRepository, times(1)).getOne();
    }

    @Test
    @DisplayName("Returning all todos should work")
    void testGetAll() {
        final List<Todo> allTodosFromDb = createTodosList();
        when(mockRepository.getAll()).thenReturn(allTodosFromDb);
        final List<Todo> expetedTodos = todoFacadeImpl.getAll();

        assertEquals(expetedTodos, allTodosFromDb);
        verify(mockRepository, times(1)).getAll();
    }

    @Test
    @DisplayName("Creating todo should work")
    void testAddTodo() {
        doNothing().when(mockRepository).addTodo(any(String.class));
        todoFacadeImpl.addTodo(TODO_NAME);
        verify(mockRepository, times(1)).addTodo(TODO_NAME);
    }

    @Test
    @DisplayName("Marking todo completed should work")
    void testMarkTodoCompleted() {
        doNothing().when(mockRepository).markTodoCompleted(any(String.class));
        todoFacadeImpl.markTodoCompleted(TODO_ID);
        verify(mockRepository, times(1)).markTodoCompleted(TODO_ID);
    }

    @Test
    @DisplayName("Renaming todo should work")
    void testRenameTodo() {
        final UpdateTodoRequest updateTodoRequest = createUpdateTodoRequest(TODO_ID, NEW_DESCRIPTION);
        doNothing().when(mockRepository).renameTodo(any(UpdateTodoRequest.class));
        todoFacadeImpl.renameTodo(updateTodoRequest);
        verify(mockRepository, times(1)).renameTodo(updateTodoRequest);
    }
}