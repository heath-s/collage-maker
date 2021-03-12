import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Collage } from './shared/collage';

interface EditorState {
  collage: Collage | null;
  currentLayerId: string[] | null;
  updatedAt: number;
}

const initialState: EditorState = {
  collage: null,
  currentLayerId: null,
  updatedAt: 0,
};

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    loadSample: (state, { payload: collage }: PayloadAction<Collage>) => {
      /**
       * @todo 데이터 파싱 중 오류 처리
       */
      state.collage = collage;
      state.updatedAt = Date.now();
    },
  }
});

export const { loadSample } = editorSlice.actions;
export default editorSlice.reducer;
