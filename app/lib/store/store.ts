import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { tasksApiSlice } from './features/task/tasksApiSlice';
import uiSlice from './features/ui/uiSlice';

const rootReducer = combineSlices(tasksApiSlice, uiSlice);

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(tasksApiSlice.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
