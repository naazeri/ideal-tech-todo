import { configureStore } from '@reduxjs/toolkit';
import { tasksApi } from './tasksApiSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      [tasksApi.reducerPath]: tasksApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(tasksApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
