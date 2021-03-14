import React, { FunctionComponent, useEffect, useMemo, useRef } from 'react';
import { bindActionCreators } from 'redux';
import { Group, Image, Transformer } from 'react-konva';
import Konva from 'konva';
import useImage from 'use-image';
import { selectLayerIds } from 'src/app/editor/duck';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { CollageLayerImage } from '../shared/collage.d';
import { LayerProps } from './index.d';

type Props = LayerProps<CollageLayerImage> & {
  onDragEnd: (layerIds: string[], left: number, top: number) => void;
  onTransformEnd: (
    layerIds: string[], left: number, top: number, width: number, height: number, rotate: number,
  ) => void;
};

const LayerImage: FunctionComponent<Props> = ({
  layer: { id, appearance, assetImageId }, layerIds, onDragEnd, onTransformEnd,
}) => {
  const isSelected = useAppSelector(
    ({ editor }) => [...(editor.currentLayerIds || [])].pop() === id,
  );
  const dispatch = useAppDispatch();
  const actions = useMemo(() => bindActionCreators({ selectLayerIds }, dispatch), [dispatch]);

  const image = useAppSelector(
    ({ editor }) => editor.collage?.assets.images[assetImageId]
  ) || { content: '' };
  const [loadedImage] = useImage(image.content);
  const imageRef = useRef<Konva.Image>(null);

  useEffect(() => {
    if (loadedImage && imageRef.current) {
      imageRef.current.cache();
      imageRef.current.getLayer()?.batchDraw();
    }
  }, [loadedImage, appearance.dimension, appearance.transform]);

  const transformerRef = useRef<Konva.Transformer>(null);
  useEffect(() => {
    if (isSelected && transformerRef.current && imageRef.current) {
      transformerRef.current.nodes([imageRef.current]);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  const handleClick = () => {
    actions.selectLayerIds(layerIds);
  };

  const handleDragEnd = ({ target }: Konva.KonvaEventObject<DragEvent>) => {
    onDragEnd(layerIds, Math.round(target.x()), Math.round(target.y()));
  };

  const handleTransformEnd = ({ target }: Konva.KonvaEventObject<Event>) => {
    const scaleX = target.scaleX();
    const scaleY = target.scaleY();
    target.scaleX(1);
    target.scaleY(1);
    let { height, width } = appearance.dimension;
    height = Math.round(height * scaleY);
    width = Math.round(width * scaleX);

    onTransformEnd(
      layerIds,
      Math.round(target.x()),
      Math.round(target.y()),
      width,
      height,
      Math.round(target.rotation()),
    );
  };

  const { compositeOperation, dimension, position, transform } = appearance;

  return (
    <Group>
      <Image
        ref={imageRef}
        draggable={isSelected}
        globalCompositeOperation={compositeOperation || undefined}
        height={dimension.height}
        image={loadedImage}
        onClick={handleClick}
        onDragEnd={handleDragEnd}
        onTransformEnd={handleTransformEnd}
        opacity={appearance.alpha}
        rotation={transform.rotate}
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

export default LayerImage;
