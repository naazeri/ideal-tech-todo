import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Todo, { TodoCreate, TodoUpdate } from '../types/todo';
import {
  createTodo,
  deleteTodo,
  fetchTodos,
  updateTodo,
} from '../api/todoService';

interface TasksState {
  tasks: Todo[];
  loading: boolean;
  error: string | null;
  message: string | null;
}

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
  message: null,
};

// Async thunks
export const getTodos = createAsyncThunk('tasks/getTodos', async () => {
  const result = await fetchTodos();
  return result.map((todo: Todo) => ({ ...todo }));
});

export const addTodo = createAsyncThunk(
  'tasks/addTodo',
  async (todo: TodoCreate) => {
    return await createTodo(todo);
  }
);

export const editTodo = createAsyncThunk(
  'tasks/editTodo',
  async ({ id, todo }: { id: string; todo: TodoUpdate }) => {
    return await updateTodo(id, todo);
  }
);

export const removeTodo = createAsyncThunk(
  'tasks/removeTodo',
  async (id: string) => {
    return await deleteTodo(id);
  }
);

// Slice
const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Todos
      .addCase(getTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(getTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add task';
      })

      // Add Todo
      .addCase(addTodo.fulfilled, (state, action) => {
        if (!action.payload.data) {
          state.error = action.payload.message || 'Failed to add task';
        }

        state.tasks.unshift(action.payload.data);
        state.message = action.payload.message;
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add task';
      })

      // Edit Todo
      .addCase(editTodo.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (task) => task._id === action.payload._id
        );
        if (index !== -1) state.tasks[index] = action.payload;
      })
      .addCase(editTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to edit task';
      })

      // Remove Todo
      .addCase(removeTodo.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(
          (task) => task._id !== action.meta.arg
        );
      })
      .addCase(removeTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to remove task';
      });
  },
});

export default tasksSlice.reducer;
