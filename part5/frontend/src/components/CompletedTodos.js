import React, { useState } from 'react';
import Button from '@mui/joy/Button';
import { useTodosContext } from '../contexts/useTodoContext';
import CompletedTodosModal from '../components/modals/CompletedTodosModal'

const CompletedTodos = () => {
  const { todos } = useTodosContext();
  const completedTodos = todos.filter(todo => todo.isCompleted);
  const [open, setOpen] = useState(false);
  
  return (
    <>
      <br />
      <Button variant="outlined" color="neutral" onClick={() => setOpen(true)}>
        View completed
      </Button>
      <CompletedTodosModal
        open={open}
        setOpen={setOpen}
        completedTodos={completedTodos}
      />
    </>
  );
}

export default CompletedTodos;