import '@testing-library/jest-dom'
import React from 'react';
import { render, screen, fireEvent, cleanup, waitFor } from "@testing-library/react";
import { TodoContext } from '../../../contexts/useTodoContext';
import { mockTodos as todos } from '../../../mockData';
import TodoList from '../../TodoList/TodoList';

const customRender = ({ todos }) => {
    return render(
        <TodoContext.Provider
            value={{ todos }}
        >
            <TodoList />
        </TodoContext.Provider>
    );
}

describe('TodoList tests', () => {
    afterEach(() => cleanup());

    test("Should have required HTML elements present", () => {
        const { container } = customRender({ todos })
        const allMarkCompletedButtons = container.querySelectorAll('#mark-completed-button')
        expect(allMarkCompletedButtons[0].innerHTML).toEqual('mark completed')
        expect(allMarkCompletedButtons[1].innerHTML).toEqual('unmark completed')
        expect(allMarkCompletedButtons[2].innerHTML).toEqual('unmark completed')

        const allRenameButtons = container.querySelectorAll('#rename-button')
        expect(allRenameButtons.length).toBe(3)
                
        expect(screen.getByText('Mock Task 1')).toBeInTheDocument()
        expect(screen.getByText('Mock Task 2')).toBeInTheDocument()
        expect(screen.getByText('Mock Task 3')).toBeInTheDocument()
    });

    test("Clicking rename button should open modal", async () => {
        const { container } = customRender({ todos })

        const firstRenameButton = container.querySelector('#rename-button')
        fireEvent.click(firstRenameButton)

        await waitFor(() => {
            // rename modal values
            expect(screen.getByText('Rename ToDo')).toBeInTheDocument()
            expect(screen.getByPlaceholderText('New description...')).toBeInTheDocument()
            expect(screen.getByText('Rename')).toBeInTheDocument()
        })
    });
});