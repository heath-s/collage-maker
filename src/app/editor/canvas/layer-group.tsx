import React, { FunctionComponent, useEffect, useMemo, useRef } from 'react';
import { bindActionCreators } from 'redux';
import { Group, Transformer } from 'react-konva';
import Konva from 'konva';
import { addImage, updateLayerDimension, updateLayerPosition } from 'src/app/editor/duck';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { CollageAssetImage, CollageLayerGroup } from '../shared/collage.d';
import { LayerProps } from './index.d';
import LayerImage from './layer-image';
import LayerText from './layer-text';

type Props = LayerProps<CollageLayerGroup>;

const LayerGroup: FunctionComponent<Props> = ({
  layer: { id, appearance, layerOrder, layers },
  layerIds
}) => {
  const isSelected = useAppSelector(
    ({ editor }) => [...(editor.currentLayerIds || [])].pop() === id,
  );
  const dispatch = useAppDispatch();
  const actions = useMemo(
    () => bindActionCreators({ addImage, updateLayerDimension, updateLayerPosition }, dispatch), [dispatch]
  );

  const groupRef = useRef<Konva.Group>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  useEffect(() => {
    if (isSelected && transformerRef.current && groupRef.current) {
      transformerRef.current.nodes([groupRef.current]);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  const handleDragEnd = (layerIds: string[], left: number, top: number) => {
    actions.updateLayerPosition({ layerIds, left, top });
  };

  const handleGroupDragEnd = ({ target }: Konva.KonvaEventObject<DragEvent>) => {
    if (!isSelected) {
      return;
    }
    const left = Math.round(target.x());
    const top = Math.round(target.y());
    actions.updateLayerPosition({ layerIds, left, top });
  };

  const handleImageAdded = (layerIds: string[], image: CollageAssetImage) => {
    actions.addImage({ image, layerIds });
  };

  const handleTransformEnd = (
    layerIds: string[], left: number, top: number, width: number, height: number, rotate: number,
  ) => {
    actions.updateLayerDimension({ height, layerIds, left, rotate, top, width });
  };

  const { position } = appearance || { position: { left: 0, top: 0 } };

  return (
    <Group>
      <Group
        ref={groupRef}
        draggable={!!id && isSelected}
        onDragEnd={handleGroupDragEnd}
        x={position.left}
        y={position.top}
      >
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
                onImageAdded={handleImageAdded}
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
      {isSelected && (
        <Transformer
          ref={transformerRef}
          enabledAnchors={[]}
          rotateEnabled={false}
        />
      )}
    </Group>
  );
};

export default LayerGroup;
