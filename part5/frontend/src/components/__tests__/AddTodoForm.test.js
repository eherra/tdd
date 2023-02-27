import '@testing-library/jest-dom'
import React from "react";
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import AddTodoForm from "../../components/AddTodoForm";
import { TodoContext } from '../../contexts/useTodoContext';
import { mockTodos as todos } from '../../mockData';
import api from '../api/api'

const customRender = ({todos, setTodos}) => {
    return render(
        <TodoContext.Provider
            value={{ todos, setTodos }}
        >
            <AddTodoForm />
        </TodoContext.Provider>
    );
}

describe('CompletedTodos tests', () => {
    const setTodos = jest.fn();

    afterEach(() => cleanup());

    test("Should have required HTML elements present", () => {
        const { container } = customRender({ todos, setTodos })
           
        const createButton = container.querySelector("button")
        expect(createButton.innerHTML).toEqual('Create')

        expect(screen.getByText("Create new To-Do")).toBeInTheDocument()

        const input = container.querySelector("input")
        expect(input).toHaveAttribute("placeholder", "Description...")
    });

    test("Creating todo should work", async () => {
        const createdTodo = {
            id: 4,
            description: "test mock",
            isCompleted: false
        };

        jest.spyOn(api, 'createTodo')
            .mockResolvedValueOnce(createdTodo);

        jest
            .spyOn(React, 'useState')
            .mockImplementationOnce(initState => [initState, setTodos]);

        const { container } = customRender({todos, setTodos})

        const input = container.querySelector("input")
        const createButton = container.querySelector("button")

        fireEvent.change(input, { target: { value: "test mock" } })

        await waitFor(() => {
            expect(input.value).toBe("test mock")
        })

        fireEvent.click(createButton)
     
        await waitFor(() => {
             expect(setTodos).toBeCalledTimes(1)
             expect(setTodos).toBeCalledWith([...todos, createdTodo])
        })
    });
});