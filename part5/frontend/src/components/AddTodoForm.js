import React, { useState } from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import api from './api/api';
import CircularProgress from '@mui/joy/CircularProgress';
import { useTodosContext } from '../contexts/useTodoContext';

const AddTodoForm = () => {
  const [todoInput, setTodoInput] = useState('')
  const [isCreatingTodo, setIsCreatingTodo] = useState(false)
  const { todos, setTodos } = useTodosContext();

  const handleInputChange = (event) => {
    setTodoInput(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsCreatingTodo(true)
    const newRequestTodo = {
      description: todoInput,
    };

    api
      .createTodo(newRequestTodo)
      .then(responseTodo => {
        setTodos([...todos, responseTodo])
        setTodoInput('')
        setIsCreatingTodo(false)
      })
      .catch(error => {
        console.log(error)
        setIsCreatingTodo(false)
      })

  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormControl sx={{ maxWidth: 700 }}>
          <FormLabel>Create new To-Do</FormLabel>
          <Input
            endDecorator={isCreatingTodo ? (
              <Button startDecorator={<CircularProgress variant="solid" thickness={2} />}>
                Creating...
              </Button>
            ) : (
              <Button type="submit">Create</Button>
            )}
            placeholder="Description..."
            required
            onChange={handleInputChange}
            value={todoInput}
          >
          </Input>
        </FormControl>
      </form>
    </>
  )
}

export default AddTodoForm