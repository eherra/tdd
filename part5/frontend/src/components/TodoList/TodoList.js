import '@fontsource/public-sans';
import React, { useState } from 'react';

import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import RenameModal from '../modals/RenameModal';
import ButtonGroup from './ButtonGroup'
import { useTodosContext } from '../../contexts/useTodoContext';

const TodoList = () => {
  const [openModal, setOpenModal] = useState(false);
  const [renameId, setRenameId] = useState("")
  const { todos } = useTodosContext();

  const handleRenameClick = (todoId) => {
    setOpenModal(true)
    setRenameId(todoId)
  }

  return (
    <>
      <List sx={{ maxWidth: 700 }}>
        {todos?.map((todo, index) =>
          <ListItem
            key={index}
            endAction={
              <ButtonGroup
                todo={todo}
                handleRenameClick={handleRenameClick}
              />}>
            <ListItemButton>
              {todo.isCompleted ?
                <strike>{todo.description}</strike>
                : todo.description
              }
            </ListItemButton>
          </ListItem>
        )}
      </List>
      <RenameModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        renameId={renameId}
        setRenameId={setRenameId}
      />
    </>
  )
}

export default TodoList;