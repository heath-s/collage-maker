import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Collage, CollageAssetImage, CollageLayer, CollageLayerGroup, CollageLayerImage, CollageLayerText, EditableCollageLayer } from './shared/collage.d';
import { findCollageLayer } from './shared/utils';

interface EditorState {
  collage: Collage | null;
  currentLayerIds: string[] | null;
  currentLayerUpdatedAt: number;
  updatedAt: number;
}

const initialState: EditorState = {
  collage: null,
  currentLayerIds: null,
  currentLayerUpdatedAt: 0,
  updatedAt: 0,
};

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    addImage: (
      state,
      {
        payload: { image, layerIds }
      }: PayloadAction<{ image: CollageAssetImage, layerIds: string[] }>
    ) => {
      const collage = state.collage;
      if (!collage) {
        return;
      }
      const copiedLayerIds = [...layerIds];
      const layerId = copiedLayerIds.pop();
      if (!layerId) {
        return;
      }
      const layer = (
        findCollageLayer(collage, layerIds) as CollageLayer<CollageLayerGroup>
      );
      if (!layer) {
        return;
      }
      collage.assets.images[image.id] = image;
      (layer as unknown as CollageLayer<CollageLayerImage>).assetImageId = image.id;
      state.currentLayerUpdatedAt = Date.now();
    },
    changeLayerOrder: (
      state,
      {
        payload: { direction, layerIds }
      }: PayloadAction<{ direction: number, layerIds: string[] }>,
    ) => {
      const collage = state.collage;
      if (!collage) {
        return;
      }
      const copiedLayerIds = [...layerIds];
      const layerId = copiedLayerIds.pop();
      if (!layerId) {
        return;
      }
      const parentLayer = (
        findCollageLayer(collage, copiedLayerIds) as CollageLayer<CollageLayerGroup>
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
      state.currentLayerIds = null;
      state.currentLayerUpdatedAt = 0;
      state.updatedAt = Date.now();
    },
    selectLayerIds: (state, { payload: layerIds }: PayloadAction<string[]>) => {
      const { currentLayerIds } = state;
      const lastLayerId = currentLayerIds?.[currentLayerIds.length - 1];
      const lastPayloadLayerId = layerIds[layerIds.length - 1];
      state.currentLayerIds = lastLayerId === lastPayloadLayerId ?
        null :
        layerIds;
      state.currentLayerUpdatedAt = Date.now();
    },
    updateLayer: (
      state,
      {
        payload: { layer, layerIds }
      }: PayloadAction<{ layer: EditableCollageLayer, layerIds: string[] }>
    ) => {
      const collage = state.collage;
      if (!collage) {
        return;
      }
      const copiedLayerIds = [...layerIds];
      const layerId = copiedLayerIds.pop();
      if (!layerId) {
        return;
      }
      const parentLayer = (
        findCollageLayer(collage, copiedLayerIds) as CollageLayer<CollageLayerGroup>
      );
      if (!parentLayer) {
        return;
      }
      (parentLayer.layers[layerId] as unknown) = {
        ...parentLayer.layers[layerId],
        ...layer,
      };
      state.currentLayerUpdatedAt = Date.now();
    },
    updateLayerDimension: (
      state,
      {
        payload: { height, layerIds, left, rotate, top, width }
      }: PayloadAction<{
        height: number;
        layerIds: string[];
        left: number;
        rotate: number;
        top: number;
        width: number;
      }>
    ) => {
      const collage = state.collage;
      if (!collage) {
        return;
      }
      const layer = findCollageLayer(collage, layerIds) as CollageLayer<CollageLayerImage | CollageLayerText>;
      if (!layer) {
        return;
      }
      layer.appearance.dimension = { height, width };
      layer.appearance.position = { left, top };
      layer.appearance.transform = { rotate };
      state.currentLayerUpdatedAt = Date.now();
    },
    updateLayerPosition: (
      state,
      {
        payload: { layerIds, left, top }
      }: PayloadAction<{ layerIds: string[], left: number, top: number }>
    ) => {
      const collage = state.collage;
      if (!collage) {
        return;
      }
      const layer = findCollageLayer(collage, layerIds) as CollageLayer;
      if (!layer) {
        return;
      }
      layer.appearance.position = { left, top };
      state.currentLayerUpdatedAt = Date.now();
    },
  }
});

export const {
  addImage,
  changeLayerOrder,
  loadSample,
  selectLayerIds,
  updateLayer,
  updateLayerDimension,
  updateLayerPosition,
} = editorSlice.actions;
export default editorSlice.reducer;
