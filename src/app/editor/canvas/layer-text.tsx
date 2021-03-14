import React, { FunctionComponent, useEffect, useMemo, useRef } from 'react';
import { bindActionCreators } from 'redux';
import Konva from 'konva';
import { Group, Text, Transformer } from 'react-konva';
import { selectLayerIds } from 'src/app/editor/duck';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { CollageLayerText } from '../shared/collage.d';
import { LayerProps } from './index.d';

type Props = LayerProps<CollageLayerText> & {
  onDragEnd: (layerIds: string[], left: number, top: number) => void;
  onTransformEnd: (
    layerIds: string[], left: number, top: number, width: number, height: number, rotate: number,
  ) => void;
};

const LayerText: FunctionComponent<Props> = ({
  layer: { id, appearance, content }, layerIds, onDragEnd, onTransformEnd,
}) => {
  const isSelected = useAppSelector(
    ({ editor }) => [...(editor.currentLayerIds || [])].pop() === id,
  );
  const dispatch = useAppDispatch();
  const actions = useMemo(() => bindActionCreators({ selectLayerIds }, dispatch), [dispatch]);

  const textRef = useRef<Konva.Text>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  useEffect(() => {
    if (isSelected && transformerRef.current && textRef.current) {
      transformerRef.current.nodes([textRef.current]);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  const handleClick = () => {
    actions.selectLayerIds(layerIds);
  };

  const handleDragEnd = ({ target }: Konva.KonvaEventObject<DragEvent>) => {
    onDragEnd(layerIds, Math.round(target.x()), Math.round(target.y()));
  };

  const handleTransform = ({ target }: Konva.KonvaEventObject<Event>) => {
    target.setAttrs({
      height: Math.round(target.height() * target.scaleY()),
      scaleX: 1,
      scaleY: 1,
      width: Math.round(target.width() * target.scaleX()),
    });
  };

  const handleTransformEnd = ({ target }: Konva.KonvaEventObject<Event>) => {
    const scaleX = target.scaleX();
    const scaleY = target.scaleY();
    target.scaleX(1);
    target.scaleY(1);
    const height = Math.round(target.height() * scaleY);
    const width = Math.round(target.width() * scaleX);

    onTransformEnd(
      layerIds,
      Math.round(target.x()),
      Math.round(target.y()),
      width,
      height,
      Math.round(target.rotation()),
    );
  };

  const { dimension, position, textStyle, transform } = appearance;

  return (
    <Group>
      <Text
        ref={textRef}
        draggable={isSelected}
        align={textStyle.textAlign}
        fill={textStyle.color}
        fontFamily={textStyle.fontFamily}
        fontSize={textStyle.fontSize}
        height={dimension.height}
        letterSpacing={textStyle.letterSpacing}
        onClick={handleClick}
        onDragEnd={handleDragEnd}
        onTransform={handleTransform}
        onTransformEnd={handleTransformEnd}
        rotation={transform.rotate}
        text={content}
        width={dimension.width}
        x={position.left}
        y={position.top}
      />
      {isSelected && (
        <Transformer
          ref={transformerRef}
          centeredScaling
        />
      )}
    </Group>
  );
};

export default LayerText;
