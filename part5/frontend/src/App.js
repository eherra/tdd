import '@fontsource/public-sans';
import React from 'react';
import CompletedTodos from './components/CompletedTodos'

import TodoList from './components/TodoList/TodoList';
import AddTodoForm from './components/AddTodoForm';
import Header from './components/Header';
import { TodosProvider } from './contexts/useTodoContext';

const App = () => (
  <>
    <Header />
    <div style={{margin: 'auto', marginTop: '2em', width: '50%', textAlign: 'center'}}>
      <TodosProvider>
        <TodoList />
        <AddTodoForm />
        <CompletedTodos />
      </TodosProvider>
    </div>
  </>
)

export default App