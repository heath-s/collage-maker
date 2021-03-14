import React, { FunctionComponent, useEffect, useRef } from 'react';
import { Image } from 'react-konva';
import Konva from 'konva';
import useImage from 'use-image';
import { useAppSelector } from 'src/app/hooks';
import { CollageLayerImage } from '../shared/collage.d';
import { LayerProps } from './index.d';

type Props = LayerProps<CollageLayerImage> & {

}

const LayerImage: FunctionComponent<Props> = ({ layer: { appearance, assetImageId } }) => {
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
  }, [loadedImage, appearance.dimension]);

  const { compositeOperation, dimension, position, transform } = appearance;
  const centered = {
    offsetX: dimension.width / 2,
    offsetY: dimension.height / 2,
    x: position.left + dimension.width / 2,
    y: position.top + dimension.height / 2
  };

  return (
    <Image
      ref={imageRef}
      globalCompositeOperation={compositeOperation || undefined}
      height={dimension.height}
      image={loadedImage}
      offsetX={centered.offsetX}
      offsetY={centered.offsetY}
      opacity={appearance.alpha}
      rotation={transform.rotate}
      width={dimension.width}
      x={centered.x}
      y={centered.y}
    />
  );
};

export default LayerImage;
