import React, { FunctionComponent, useMemo } from 'react';
import { Group } from 'react-konva';
import { bindActionCreators } from 'redux';
import { updateLayerDimension, updateLayerPosition } from 'src/app/editor/duck';
import { useAppDispatch } from 'src/app/hooks';
import { CollageLayerGroup } from '../shared/collage.d';
import { LayerProps } from './index.d';
import LayerImage from './layer-image';
import LayerText from './layer-text';

type Props = LayerProps<CollageLayerGroup>;

const LayerGroup: FunctionComponent<Props> = ({ layer: { layerOrder, layers }, layerIds }) => {
  const dispatch = useAppDispatch();
  const actions = useMemo(
    () => bindActionCreators({ updateLayerDimension, updateLayerPosition }, dispatch), [dispatch]
  );

  const handleDragEnd = (layerIds: string[], left: number, top: number) => {
    actions.updateLayerPosition({ layerIds, left, top });
  };

  const handleTransformEnd = (
    layerIds: string[], left: number, top: number, width: number, height: number, rotate: number,
  ) => {
    actions.updateLayerDimension({ height, layerIds, left, rotate, top, width });
  };

  return (
    <Group>
      {layerOrder.map((id) => {
        const key = `LayerGroup#${id}`;
        const layer = layers[id];
        if (!layer) {
          return null;
        }

        const childLayerIds = [...layerIds, id];
        switch (layer.type) {
        case 'group': {
          return (
            <LayerGroup
              key={key}
              layer={layer}
              layerIds={childLayerIds}
            />
          );
        }

        case 'image': {
          return (
            <LayerImage
              key={key}
              layer={layer}
              layerIds={childLayerIds}
              onDragEnd={handleDragEnd}
              onTransformEnd={handleTransformEnd}
            />
          );
        }

        case 'text': {
          return (
            <LayerText
              key={key}
              layer={layer}
              layerIds={childLayerIds}
              onDragEnd={handleDragEnd}
              onTransformEnd={handleTransformEnd}
            />
          );
        }}
      })}
    </Group>
  );
};

export default LayerGroup;
