import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import projectReducer from './projectSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    projects: projectReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
