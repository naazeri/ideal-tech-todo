import { configureStore } from '@reduxjs/toolkit';
import tasksSlice from './tasksSlice';

const store = configureStore({
  reducer: {
    tasks: tasksSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
