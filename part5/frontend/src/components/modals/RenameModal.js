import React, { useState } from 'react';

import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import api from '../api/api';
import { useTodosContext } from '../../contexts/useTodoContext'

import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';

const RenameModal = ({
  openModal,
  setOpenModal,
  renameId,
  setRenameId
}) => {
  const [renameInput, setRenameInput] = useState("")
  const { todos, setTodos } = useTodosContext();

  const handleInputChange = (event) => {
    setRenameInput(event.target.value)
  }

  const handleRenameSubmit = (event) => {
    event.preventDefault();

    const renamed = {
      id: renameId,
      newDescription: renameInput
    }

    api
      .renanameTodo(renamed)
      .then(response => {
        setTodos(todos.map(todo => {
          if (todo.id === renameId) {
            return {
              ...todo,
              description: renameInput
            }
          }
          return { ...todo };
        }))
        setOpenModal(false);
        setRenameInput("")
        setRenameId("")
      })
      .catch(error => {
        console.log('Renaming todo didnt work', error)
        setOpenModal(false);
        setRenameInput("")
        setRenameId("")
      })
  }

  return (
    <Modal open={openModal} onClose={() => {
      setOpenModal(false)
      setRenameId("")
    }}>
      <ModalDialog
        sx={{
          maxWidth: 700,
          borderRadius: 'md',
          p: 3,
          boxShadow: 'lg',
        }}
      >
        <form onSubmit={handleRenameSubmit}>
          <Stack spacing={2}>
            <FormControl sx={{ maxWidth: 700 }}>
              <FormLabel>Rename ToDo</FormLabel>
              <Input
                placeholder="New description..."
                required
                onChange={handleInputChange}
              >
              </Input>
            </FormControl>
            <Button type="submit" id='renameTodoButton'>Rename</Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  )
}

export default RenameModal;