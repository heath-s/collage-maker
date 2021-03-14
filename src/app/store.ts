import { configureStore } from '@reduxjs/toolkit';
import editor from 'src/app/editor/duck';

const store = configureStore({
  reducer: {
    editor,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
