import '@testing-library/jest-dom'
import React from 'react';
import { render, screen, fireEvent, cleanup, waitFor } from "@testing-library/react";
import { mockTodos as todos } from "../../../mockData"
import CompletedTodosModal from '../../modals/CompletedTodosModal';

describe('CompletedTodosModal tests', () => {
  const setOpen = jest.fn();
  const completedTodos = todos.filter(todo => todo.isCompleted);
  afterEach(() => cleanup());

  test("Should have required HTML elements present", async () => {
    const { container } = render(
      <CompletedTodosModal
        open={true}
        setOpen={setOpen}
        completedTodos={completedTodos}
      />
    )
    await waitFor(() => {
      expect(screen.queryByText('Mock Task 1')).toBeNull()

      expect(screen.getByText('Completed To-Dos')).toBeInTheDocument()
      expect(screen.getByText('Mock Task 2')).toBeInTheDocument()
      expect(screen.getByText('Mock Task 3')).toBeInTheDocument()
    })
  });

  test("Should show Nothing here! when no todos to show", async () => {
    const { container } = render(
      <CompletedTodosModal
        open={true}
        setOpen={setOpen}
        completedTodos={[]}
      />
    )
    await waitFor(() => {
      expect(screen.getByText('Nothing here!')).toBeInTheDocument()
      expect(screen.getByText('Completed To-Dos')).toBeInTheDocument()
      
      expect(screen.queryByText('Mock Task 1')).toBeNull()
      expect(screen.queryByText('Mock Task 2')).toBeNull()
      expect(screen.queryByText('Mock Task 3')).toBeNull()
    })
  });
});