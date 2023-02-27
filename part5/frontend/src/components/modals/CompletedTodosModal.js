import React from 'react';
import { Transition } from 'react-transition-group';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';

const CompletedTodosModal = ({ open, setOpen, completedTodos }) => {
  return (
    <Transition in={open} timeout={400}>
      {(state) => (
        <Modal
          keepMounted
          open={!['exited', 'exiting'].includes(state)}
          onClose={() => setOpen(false)}
          slotProps={{
            backdrop: {
              sx: {
                opacity: 0,
                backdropFilter: 'none',
                transition: `opacity 400ms, backdrop-filter 400ms`,
                ...{
                  entering: { opacity: 1, backdropFilter: 'blur(8px)' },
                  entered: { opacity: 1, backdropFilter: 'blur(8px)' },
                }[state],
              },
            },
          }}
          sx={{
            visibility: state === 'exited' ? 'hidden' : 'visible',
          }}
        >
          <ModalDialog
            aria-labelledby="fade-modal-dialog-title"
            aria-describedby="fade-modal-dialog-description"
            sx={{
              opacity: 0,
              transition: `opacity 300ms`,
              ...{
                entering: { opacity: 1 },
                entered: { opacity: 1 },
              }[state],
            }}
          >
            <Typography
              component="h2"
              level="inherit"
              fontSize="1.25em"
              mb="0.25em"
            >
              Completed To-Dos
            </Typography>
              {completedTodos.length ? (
                <ul>
                  {completedTodos?.map((todo, index) =>
                    <li key={index}>{todo.description}</li>
                  )}
                </ul>
              ) : (
                <p>Nothing here!</p>
              )}
          </ModalDialog>
        </Modal>
      )}
    </Transition>
  )
}

export default CompletedTodosModal