import { RequestCreate, RequestUpdate } from '../types/request';
import { Todo } from '../types/todo';

// Service function for fetching todos
export const fetchTodosService = () => ({
  url: 'todos/fetch/all',
  method: 'GET',
});

// Service function for creating a todo
export const createTodoService = (todo: RequestCreate<Todo>) => ({
  url: 'todos/create',
  method: 'POST',
  data: todo,
});

// Service function for updating a todo
export const updateTodoService = (id: string, todo: RequestUpdate<Todo>) => ({
  url: `todos/update/${id}`,
  method: 'PUT',
  data: todo,
});

// Service function for deleting a todo
export const deleteTodoService = (id: string) => ({
  url: `todos/delete/${id}`,
  method: 'DELETE',
});
