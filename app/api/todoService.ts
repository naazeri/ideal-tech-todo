import { compareDesc, parseISO } from 'date-fns';
import Todo, { TodoCreate, TodoUpdate } from '../model/todo';
import axiosInstance from './axiosConfig';

// Fetch all todos
export const fetchTodos = async () => {
  const response = await axiosInstance.get('todos/fetch/all');
  const todos: Todo[] = response.data.data;

  // Sort todos by start_date
  return todos.sort((a, b) =>
    compareDesc(parseISO(a.start_date), parseISO(b.start_date))
  );
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
