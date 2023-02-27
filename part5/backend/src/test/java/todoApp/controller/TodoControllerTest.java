package todoApp.controller;

import todoApp.model.Todo;
import todoApp.service.TodoFacade;
import todoApp.model.requests.AddTodoRequest;
import todoApp.model.requests.UpdateTodoRequest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static todoApp.utils.TestUtil.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@AutoConfigureMockMvc
class TodoControllerTest {
    private static final String SINGLE_TODO_DESCRIPTION = "Single Test Mock 1";
    private static final String UPDATE_TODO_NAME = "Renamed todo name";
    private static final String TODO_ID = "123";
    private static final String MONDODB_GENERATED_ID = "random123qsdLWdq213";


    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private TodoFacade mockFacade;

    @Test
    @DisplayName("Calling all-endpoint should return all todos")
    void testGetTodosShouldReturnAllTodos() throws Exception {
        when(mockFacade.getAll()).thenReturn(createTodosList());
        final MockHttpServletResponse response = mockMvc.perform(get("/api/todos/all"))
                .andExpectAll(
                        status().isOk(),
                        content().contentType(MediaType.APPLICATION_JSON))
                .andReturn().getResponse();

        assertEquals(response.getContentAsString(), asJsonString(createTodosList()));
    }

    @Test
    @DisplayName("Adding Todo should work")
    void testAddTodo() throws Exception {
        final AddTodoRequest requestTodo = createAddTodoRequest(SINGLE_TODO_DESCRIPTION);
        final Todo expectedTodo = Todo.builder()
                .id(MONDODB_GENERATED_ID)
                .description(SINGLE_TODO_DESCRIPTION)
                .isCompleted(false)
                .build();

        when(mockFacade.addTodo(any(String.class))).thenReturn(expectedTodo);
        final MockHttpServletResponse response = mockMvc.perform(MockMvcRequestBuilders
                    .post("/api/todos/add-todo")
                    .content(asJsonString(requestTodo))
                    .contentType(MediaType.APPLICATION_JSON))
                .andReturn().getResponse();
        System.out.println(response);
        assertEquals(HttpStatus.CREATED.value(), response.getStatus());

        verify(mockFacade, times(1)).addTodo(SINGLE_TODO_DESCRIPTION);
    }

    @Test
    @DisplayName("Marking Todo completed should work")
    void testMarkTodoCompleted() throws Exception {
        doNothing().when(mockFacade).markTodoCompleted(any(String.class), any(Boolean.class));

        final MockHttpServletResponse response = mockMvc.perform(MockMvcRequestBuilders
                        .put("/api/todos/completed/" + TODO_ID)
                        .param("isCompleted", "true"))
                .andReturn().getResponse();

        assertEquals(HttpStatus.OK.value(), response.getStatus());
        verify(mockFacade, times(1)).markTodoCompleted(TODO_ID, true);
    }

    @Test
    @DisplayName("Renaming Todo should work")
    void TestRenameTodo() throws Exception {
        final UpdateTodoRequest updateRequest = createUpdateTodoRequest(TODO_ID, UPDATE_TODO_NAME);

        doNothing().when(mockFacade).renameTodo(any(UpdateTodoRequest.class));

        final MockHttpServletResponse response = mockMvc.perform(MockMvcRequestBuilders
                        .put("/api/todos/rename-todo")
                        .content(asJsonString(updateRequest))
                        .contentType(MediaType.APPLICATION_JSON))
                .andReturn().getResponse();

        assertEquals(HttpStatus.OK.value(), response.getStatus());
        verify(mockFacade, times(1)).renameTodo(updateRequest);
    }
}