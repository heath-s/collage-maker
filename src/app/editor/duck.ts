import { createSlice } from '@reduxjs/toolkit';
import { Collage } from './shared/collage';

interface EditorState {
  collage: Collage | null;
  currentLayerIndex: number | null;
  updatedAt: number;
}

const initialState: EditorState = {
  collage: null,
  currentLayerIndex: null,
  updatedAt: 0,
};

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    tickAll: (state) => {
      state.updatedAt = Date.now();
    },
  }
});

export const { tickAll } = editorSlice.actions;
export default editorSlice.reducer;
