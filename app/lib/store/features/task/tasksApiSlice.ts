import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '../../baseQuery';
import {
  fetchTodosService,
  createTodoService,
  updateTodoService,
  deleteTodoService,
} from '@/app/lib/services/todoService';
import { ResponseTodo } from '@/app/lib/types/response';
import { Todo } from '@/app/lib/types/todo';
import { RequestCreate, RequestUpdate } from '@/app/lib/types/request';

export const tasksApiSlice = createApi({
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
} = tasksApiSlice;
