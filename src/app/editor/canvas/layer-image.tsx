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

  return (
    <Image
      ref={imageRef}
      globalCompositeOperation={compositeOperation || undefined}
      height={dimension.height}
      image={loadedImage}
      opacity={appearance.alpha}
      rotation={transform.rotate}
      width={dimension.width}
      x={position.left}
      y={position.top}
    />
  );
};

export default LayerImage;
