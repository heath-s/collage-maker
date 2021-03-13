import { Collage, CollageLayer, CollageLayerGroup } from './collage';

export const selectNestedLayer = (collage: Collage | null, parentLayerIds: string[] | null): CollageLayer | null => {
  const item = collage as unknown as CollageLayer<CollageLayerGroup>;
  if (!parentLayerIds || parentLayerIds.length === 0) {
    return item;
  }
  if (!collage) {
    return null;
  }

  return parentLayerIds.reduce(
    (layer: CollageLayer | null, layerId) => {
      if (!layer) {
        return null;
      }
      const item = layer as CollageLayer<CollageLayerGroup>;
      if (!item.layers) {
        return null;
      }
      return item.layers[layerId];
    },
    item,
  );
};
