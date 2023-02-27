import axios from 'axios'

const baseUrl = 'http://localhost:8080/api/todos'

const getAll = async () => {
  const response = await axios.get(`${baseUrl}/all`)
  return response.data
}

const createTodo = async newTodo => {
  const response = await axios.post(`${baseUrl}/add-todo`, newTodo)
  return response.data
}

const toggleCompleted = async (id, newCompletedValue) => {
  const response = await axios.put(`${baseUrl}/completed/${id}?isCompleted=${newCompletedValue}`)
  return response.data
}

const renanameTodo = async renameTodo => {
  const response = await axios.put(`${baseUrl}/rename-todo`, renameTodo)
  return response.data
}

export default {
  getAll,
  createTodo,
  toggleCompleted,
  renanameTodo
}