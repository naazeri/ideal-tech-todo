import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '../services/baseQuery';
import { Todo } from '../types/todo';
import { ResponseTodo } from '../types/response';
import {
  fetchTodosService,
  createTodoService,
  updateTodoService,
  deleteTodoService,
} from '../services/todoService';
import { RequestCreate, RequestUpdate } from '../types/request';

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Todos'],
  endpoints: (builder) => ({
    fetchTodos: builder.query<ResponseTodo<Todo[]>, void>({
      query: () => fetchTodosService(),
      providesTags: ['Todos'],
    }),
    createTodo: builder.mutation<Todo, RequestCreate<Todo>>({
      query: (todo) => createTodoService(todo),
      invalidatesTags: ['Todos'],
    }),
    updateTodo: builder.mutation<
      Todo,
      { id: string; todo: RequestUpdate<Todo> }
    >({
      query: ({ id, todo }) => updateTodoService(id, todo),
      invalidatesTags: ['Todos'],
    }),
    deleteTodo: builder.mutation<{ message: string }, string>({
      query: (id) => deleteTodoService(id),
      invalidatesTags: ['Todos'],
    }),
  }),
});

export const {
  useFetchTodosQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = tasksApi;
