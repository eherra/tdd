import axios from 'axios';
import api from '../../api/api';

jest.mock('axios');

describe('Todos Api', () => {
    beforeEach(() => {
        jest.resetAllMocks();
      });

    describe('getAll todos works', () => {
    test('Calling getAll functions returns allTodos', async () => {
        const allTodos = [{
            id: 1,
            description: "first mock",
            isCompleted: false
        },
        {
            id: 2,
            description: "second mock",
            isCompleted: true
        }];

        axios.get.mockImplementation(() => Promise.resolve({ data: allTodos }));
        const allTodosFromApi = await api.getAll()

        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(axios.get).toHaveBeenCalledWith("http://localhost:8080/api/todos/all")

        expect(allTodosFromApi).toEqual(allTodos);
    });
    });

    describe('createTodo works', () => {
      test('Calling createTodo functions returns created todo', async () => {
        const createdTodo = {
            id: 4,
            description: "test mock",
            isCompleted: false
        };

        axios.post.mockImplementation(() => Promise.resolve({ data: createdTodo }));
        const testName = "test mock"
        const todoFromApi = await api.createTodo(testName)
  
        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(axios.post).toHaveBeenCalledWith("http://localhost:8080/api/todos/add-todo", testName)

        expect(createdTodo).toEqual(todoFromApi);
      });
    });

    describe('ToggleCompleted works', () => {
        test('Calling ToggleCompleted returns 200 ', async () => {
      
          axios.put.mockImplementation(() => Promise.resolve({ status: 200 }));
          await api.toggleCompleted(1, true);

          expect(axios.put).toHaveBeenCalledWith("http://localhost:8080/api/todos/completed/1?isCompleted=true")
          expect(axios.put).toHaveBeenCalledTimes(1);
        });
      });


    describe('Renaming todo works', () => {
      test('Calling RenameTodo returns 200 ', async () => {
        const testName = "new name"
        axios.put.mockImplementation(() => Promise.resolve({ status: 200 }));
        await api.renanameTodo(testName);

        expect(axios.put).toHaveBeenCalledWith("http://localhost:8080/api/todos/rename-todo", testName)
        expect(axios.put).toHaveBeenCalledTimes(1);
      });
    });
  });
  