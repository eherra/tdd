package todoApp.repository;

import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import todoApp.model.Todo;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class TodoRepositoryTest {

    @Autowired
    private TodoRepository todoRepository;

    @BeforeEach
    public void init() {
        final Todo testTodo = Todo.builder()
                .id("1")
                .description("initMockName")
                .isCompleted(false)
                .build();

        todoRepository.saveTodo(testTodo);
    }

    @AfterEach
    public void teardown() {
        todoRepository.dropTestDatabase();
    }

    @Test
    @DisplayName("Should get all todos from the db")
    void getAllTodos() {
        final List<Todo> allTodos =  todoRepository.getAllTodos();
        assertEquals(allTodos.size(), 1);
        assertEquals(allTodos.get(0).getDescription(), "initMockName");
    }

    @Test
    @DisplayName("Saving todo to db should work")
    void saveTodo() {
        final Todo testTodo = Todo.builder()
                .id("2")
                .description("mockTest")
                .isCompleted(false)
                .build();

        todoRepository.saveTodo(testTodo);
        final List<Todo> allTodos =  todoRepository.getAllTodos();
        assertEquals(allTodos.size(), 2);
        assertEquals(allTodos.get(1).getDescription(), "mockTest");
    }

    @Test
    @DisplayName("Renaming todo should work")
    void renameTodo() {
        todoRepository.renameTodo("1", "newName");
        final List<Todo> allTodos =  todoRepository.getAllTodos();
        assertEquals(allTodos.size(), 1);
        assertEquals(allTodos.get(0).getDescription(), "newName");
    }

    @Test
    @DisplayName("Updating completeness should work")
    void updateComplete() {
        final List<Todo> firstTodos =  todoRepository.getAllTodos();
        assertEquals(firstTodos.get(0).isCompleted(), false);

        todoRepository.updateComplete("1", true);
        final List<Todo> secondTodos =  todoRepository.getAllTodos();
        assertEquals(secondTodos.get(0).isCompleted(), true);
    }
}