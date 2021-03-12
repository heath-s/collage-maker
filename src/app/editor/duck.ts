import { createSlice } from '@reduxjs/toolkit';

interface EditorState {
  currentLayerIndex: number | null;
  updatedAt: number;
}

const initialState: EditorState = {
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
