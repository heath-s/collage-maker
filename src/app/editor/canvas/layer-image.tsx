import React, { DragEvent as ReactDragEvent, FunctionComponent, useEffect, useMemo, useRef } from 'react';
import { bindActionCreators } from 'redux';
import { Group, Image, Transformer } from 'react-konva';
import Konva from 'konva';
import useImage from 'use-image';
import { selectLayerIds } from 'src/app/editor/duck';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { CollageAssetImage, CollageLayerImage } from '../shared/collage.d';
import CanvasPortal from './portal';
import { LayerProps } from './index.d';

type Props = LayerProps<CollageLayerImage> & {
  onDragEnd: (layerIds: string[], left: number, top: number) => void;
  onImageAdded: (layerIds: string[], image: CollageAssetImage) => void;
  onTransformEnd: (
    layerIds: string[], left: number, top: number, width: number, height: number, rotate: number,
  ) => void;
};

const LayerImage: FunctionComponent<Props> = ({
  layer: { id, appearance, assetImageId }, layerIds, onDragEnd, onImageAdded, onTransformEnd,
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

  const dropRef = useRef<HTMLDivElement>(null);

  const handleFileDragIn = (ev: ReactDragEvent<HTMLDivElement>) => {
    if (dropRef.current) {
      dropRef.current.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    }
    ev.preventDefault();
  };

  const handleFileDragOut = () => {
    if (dropRef.current) {
      dropRef.current.style.backgroundColor = '';
    }
  };

  const handleFileDrop = (ev: ReactDragEvent<HTMLDivElement>) => {
    const dataTransfer = ev.dataTransfer;
    const file = dataTransfer.files[0];
    if (file) {
      /**
       * @todo 코드 개선 필요 (ImageEditor와 중복 코드)
       */
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        const id = `image#${Date.now()}`;
        const content = reader.result as string;
        const metadata = {
          mimeType: file.type,
          title: file.name,
        };
        onImageAdded(layerIds, { id, content, metadata });
      });
      reader.readAsDataURL(file);
    }
    handleFileDragOut();
    ev.preventDefault();
  };

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
        <>
          <CanvasPortal
            ref={dropRef}
            height={dimension.height}
            left={imageRef.current?.getAbsolutePosition().x}
            offsetLeft={imageRef.current?.getStage()?.container().offsetLeft}
            offsetTop={imageRef.current?.getStage()?.container().offsetTop}
            rotate={transform.rotate}
            top={imageRef.current?.getAbsolutePosition().y}
            width={dimension.width}
          >
            <div
              onDragEnd={handleFileDragOut}
              onDragLeave={handleFileDragOut}
              onDragOver={handleFileDragIn}
              onDrop={handleFileDrop}
              style={{
                bottom: '33%',
                left: '33%',
                pointerEvents: 'auto',
                position: 'absolute',
                right: '33%',
                top: '33%',
              }}
            />
          </CanvasPortal>
          <Transformer
            ref={transformerRef}
            centeredScaling
          />
        </>
      )}
    </Group>
  );
};

export default LayerImage;
