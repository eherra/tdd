import Button from '@mui/joy/Button';
import api from '../api/api';
import { useTodosContext } from '../../contexts/useTodoContext';

const ButtonGroup = ({ todo, handleRenameClick }) => {
  const { todos, setTodos } = useTodosContext();

  const toggleCompleted = updateTodo => {
    api
      .toggleCompleted(updateTodo.id, !updateTodo.isCompleted)
      .then(response => {
        setTodos(todos.map(mapTodo => {
          if (mapTodo.id === updateTodo.id) {
            return {
              ...mapTodo,
              isCompleted: !updateTodo.isCompleted
            }
          }
          return { ...mapTodo };
        }))
      })
      .catch(error => {
        console.log('Marking completed didnt work', error)
      })
  }

  return (
    <>
      <Button
        id='mark-completed-button'
        size="sm"
        color="neutral"
        style={{ marginRight: '1em' }}
        variant={todo.isCompleted ? 'outlined' : 'solid'}
        onClick={() => toggleCompleted(todo)}>
        {todo.isCompleted ? 'unmark completed' : 'mark completed'}
      </Button>

      <Button
        id='rename-button'
        size="sm"
        color="primary"
        onClick={() => handleRenameClick(todo.id)}>
        rename
      </Button>
    </>
  )
}

export default ButtonGroup;