import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Collage, CollageLayer, CollageLayerGroup } from './shared/collage';
import { findCollageLayer } from './shared/utils';

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
    changeLayerOrder: (
      state,
      {
        payload: { direction, layerIds: parentLayerIds }
      }: PayloadAction<{ direction: number, layerIds: string[] }>,
    ) => {
      const collage = state.collage;
      if (!collage) {
        return;
      }
      const layerId = parentLayerIds.pop();
      if (!layerId) {
        return;
      }
      const parentLayer = (
        findCollageLayer(collage, parentLayerIds) as CollageLayer<CollageLayerGroup>
      );
      if (!parentLayer) {
        return;
      }
      const layerOrder = parentLayer.layerOrder;
      const layerIndex = layerOrder.indexOf(layerId);
      switch (direction) {
      case -1: {
        parentLayer.layerOrder = [
          ...layerOrder.slice(0, layerIndex - 1),
          layerId,
          layerOrder[layerIndex - 1],
          ...layerOrder.slice(layerIndex + 1),
        ];
        break;
      }

      case 1: {
        parentLayer.layerOrder = [
          ...layerOrder.slice(0, layerIndex),
          layerOrder[layerIndex + 1],
          layerId,
          ...layerOrder.slice(layerIndex + 2),
        ];
        break;
      }

      default: {
        return;
      }}
    },
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

export const { changeLayerOrder, loadSample, selectLayerIds } = editorSlice.actions;
export default editorSlice.reducer;
