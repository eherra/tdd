import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../components/api/api';

export const TodoContext = createContext({
  isLoading: undefined,
  todos: undefined,
  setTodos: undefined,
});

export const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [isLoadingTodos, setIsLoadingTodos] = useState(false);

  useEffect(() => {
    setIsLoadingTodos(true)
    api
      .getAll()
      .then(initialTodos => {
        setTodos(initialTodos)
        setIsLoadingTodos(false)
      })
      .catch(error => {
        console.log(error)
        setIsLoadingTodos(false)
      })
  }, [])

  return (
    <TodoContext.Provider
      value={{ todos, setTodos, isLoading: isLoadingTodos }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodosContext = () => useContext(TodoContext);