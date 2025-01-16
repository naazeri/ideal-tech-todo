import { compareDesc, parseISO } from 'date-fns';
import Todo, { TodoCreate, TodoUpdate } from '../types/todo';
import axiosInstance from './axiosConfig';

// Fetch all todos
export const fetchTodos = async () => {
  try {
    const response = await axiosInstance.get('todos/fetch/all');
    const todos: Todo[] = response.data.data;

    // Sort todos by start_date
    return todos.sort((a, b) =>
      compareDesc(parseISO(a.start_date), parseISO(b.start_date))
    );
  } catch (error) {
    handleApiError(error, 'Failed to fetch todos');
  }
};

// Create a new todo
export const createTodo = async (todo: TodoCreate) => {
  try {
    const response = await axiosInstance.post('todos/create', todo);
    return response.data;
  } catch (error) {
    handleApiError(error, 'Failed to create todos');
  }
};

// Update an existing todo
export const updateTodo = async (id: string, todo: TodoUpdate) => {
  try {
    const response = await axiosInstance.put(`todos/update/${id}`, todo);
    return response.data;
  } catch (error) {
    handleApiError(error, 'Failed to update todos');
  }
};

// Delete a todo
export const deleteTodo = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`todos/delete/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error, 'Failed to delete todos');
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleApiError(error: any, defaultMessage: string): never {
  if (error.response) {
    if (error.response.status === 404) {
      throw new Error('Resource not found');
    } else if (error.response.status === 500) {
      throw new Error('Internal server error');
    }
    throw new Error(error.response.data?.message || defaultMessage);
  }

  throw new Error('Unknown error occurred');
}
