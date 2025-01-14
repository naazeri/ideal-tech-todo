import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Task from '../model/todo';
import {
  createTodo,
  deleteTodo,
  fetchTodos,
  updateTodo,
} from '../api/todoService';

interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
};

// Async thunks
export const getTodos = createAsyncThunk('tasks/getTodos', async () => {
  return await fetchTodos();
});

export const addTodo = createAsyncThunk(
  'tasks/addTodo',
  async (todo: Omit<Task, '_id'>) => {
    return await createTodo(todo);
  }
);

export const editTodo = createAsyncThunk(
  'tasks/editTodo',
  async ({ id, todo }: { id: string; todo: Partial<Omit<Task, '_id'>> }) => {
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
      .addCase(getTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tasks';
      })

      .addCase(addTodo.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })

      .addCase(editTodo.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (task) => task._id === action.payload._id
        );
        if (index !== -1) state.tasks[index] = action.payload;
      })

      .addCase(removeTodo.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(
          (task) => task._id !== action.meta.arg
        );
      });
  },
});

export default tasksSlice.reducer;

// export const { addTask, updateTask, deleteTask } = tasksSlice.actions;
