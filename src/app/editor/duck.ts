import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Collage } from './shared/collage';

interface EditorState {
  collage: Collage | null;
  currentLayerIds: string[] | null;
  updatedAt: number;
}

const initialState: EditorState = {
  collage: null,
  currentLayerIds: null,
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
    selectLayerIds: (state, { payload: layerIds }: PayloadAction<string[]>) => {
      const { currentLayerIds } = state;
      const lastLayerId = currentLayerIds?.[currentLayerIds.length - 1];
      const lastPayloadLayerId = layerIds[layerIds.length - 1];
      state.currentLayerIds = lastLayerId === lastPayloadLayerId ?
        null :
        layerIds;
    },
  }
});

export const { loadSample, selectLayerIds } = editorSlice.actions;
export default editorSlice.reducer;
