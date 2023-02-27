import '@testing-library/jest-dom'
import { render, screen, fireEvent } from "@testing-library/react";
import CompletedTodos from "../../components/CompletedTodos";
import { TodoContext } from '../../contexts/useTodoContext';
import { mockTodos as todos }from '../../mockData';

describe('CompletedTodos tests', () => {
  const setTodos = jest.fn();

  test("Should have open modal button", () => {
    const { container } = render(
      <TodoContext.Provider
        value={{ todos, setTodos }}
      >
        <CompletedTodos />
      </TodoContext.Provider>
    );
    const viewButton = container.querySelector("button")
    expect(viewButton.innerHTML).toEqual('View completed')

  });

  test("Should open modal with completed todos listed", () => {
    const { container } = render(
      <TodoContext.Provider
        value={{ todos, setTodos }}
      >
        <CompletedTodos />
      </TodoContext.Provider>
    );
    const viewButton = container.querySelector("button")
    
    // opens modal
    fireEvent.click(viewButton)

    expect(screen.getByText('Mock Task 2')).toBeVisible()
    expect(screen.getByText('Mock Task 3')).toBeVisible()
  });
});