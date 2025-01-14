import { TodoCreate, TodoUpdate } from '../model/todo';
import axiosInstance from './axiosConfig';

// Fetch all todos
export const fetchTodos = async () => {
  const response = await axiosInstance.get('todos/fetch/all');
  return response.data.data;
};

// Create a new todo
export const createTodo = async (todo: TodoCreate) => {
  const response = await axiosInstance.post('todos/create', todo);
  return response.data;
};

// Update an existing todo
export const updateTodo = async (id: string, todo: TodoUpdate) => {
  const response = await axiosInstance.put(`todos/update/${id}`, todo);
  return response.data;
};

// Delete a todo
export const deleteTodo = async (id: string) => {
  const response = await axiosInstance.delete(`todos/delete/${id}`);
  return response.data;
};
