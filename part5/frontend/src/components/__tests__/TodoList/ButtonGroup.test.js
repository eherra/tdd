import '@testing-library/jest-dom'
import React from 'react';
import { render, screen, fireEvent, cleanup, waitFor } from "@testing-library/react";
import { TodoContext } from '../../../contexts/useTodoContext';
import { mockTodos as todos } from '../../../mockData';
import api from '../../api/api';
import ButtonGroup from '../../TodoList/ButtonGroup';

const testTodo = {
    id: 1,
    description: "test mock",
    isCompleted: false
};

const customRender = ({ todos, setTodos, testTodo, handleRenameClick }) => {
    return render(
        <TodoContext.Provider
            value={{ todos, setTodos }}
        >
            <ButtonGroup
                todo={testTodo}
                handleRenameClick={handleRenameClick} />
        </TodoContext.Provider>
    );
}

describe('ButtonGroup tests', () => {
    const setTodos = jest.fn();
    const handleRenameClick = jest.fn()
    afterEach(() => cleanup());

    test("Should have required HTML elements present", () => {
        const { container } = customRender({ todos, setTodos, testTodo })

        expect(container.querySelector('#mark-completed-button')).toBeInTheDocument()
        expect(container.querySelector('#rename-button')).toBeInTheDocument()
    });

    test("Marking completed should work", async () => {

        jest.spyOn(api, 'toggleCompleted')
            .mockResolvedValueOnce();

        const { container } = customRender({ todos, setTodos, testTodo, handleRenameClick })

        const markCompletedButton = container.querySelector('#mark-completed-button')
        fireEvent.click(markCompletedButton)

        await waitFor(() => {
            expect(setTodos).toBeCalledTimes(1)
            expect(handleRenameClick).not.toBeCalled()
        })
    });


    test("Clicking rename should work", async () => {
        const { container } = customRender({ todos, setTodos, testTodo, handleRenameClick })

        const renameButton = container.querySelector('#rename-button')
        fireEvent.click(renameButton)

        await waitFor(() => {
            expect(handleRenameClick).toBeCalledTimes(1)
            expect(handleRenameClick).toBeCalledWith(1) // id of testTodo
            expect(setTodos).not.toBeCalled()
        })
    });
});