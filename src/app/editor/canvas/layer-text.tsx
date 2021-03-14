import React, { FocusEvent, FunctionComponent, useEffect, useMemo, useRef, useState } from 'react';
import { bindActionCreators } from 'redux';
import Konva from 'konva';
import { Group, Text, Transformer } from 'react-konva';
import { selectLayerIds, updateLayer } from 'src/app/editor/duck';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import CanvasPortal from './portal';
import { CollageLayerText } from '../shared/collage.d';
import { LayerProps } from './index.d';

type Props = LayerProps<CollageLayerText> & {
  onDragEnd: (layerIds: string[], left: number, top: number) => void;
  onTransformEnd: (
    layerIds: string[], left: number, top: number, width: number, height: number, rotate: number,
  ) => void;
};

const LayerText: FunctionComponent<Props> = ({ layer, layerIds, onDragEnd, onTransformEnd }) => {
  const { id, appearance, content } = layer;
  const isSelected = useAppSelector(
    ({ editor }) => [...(editor.currentLayerIds || [])].pop() === id,
  );
  const dispatch = useAppDispatch();
  const actions = useMemo(
    () => bindActionCreators({ selectLayerIds, updateLayer }, dispatch),
    [dispatch],
  );

  const textRef = useRef<Konva.Text>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  useEffect(() => {
    if (isSelected && transformerRef.current && textRef.current) {
      transformerRef.current.nodes([textRef.current]);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  const textareaRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    actions.selectLayerIds(layerIds);
  };

  const [isEditable, setIsEditable] = useState(false);
  const [textareaContent, setTextareaContent] = useState('');
  const handleDblClick = () => {
    setTextareaContent(content);
    setIsEditable(true);
  };
  useEffect(() => {
    if (!isSelected) {
      setIsEditable(false);
    }
  }, [isSelected]);

  const handleDragEnd = ({ target }: Konva.KonvaEventObject<DragEvent>) => {
    if (!isSelected) {
      return;
    }
    onDragEnd(layerIds, Math.round(target.x()), Math.round(target.y()));
  };

  const handleTextareaBlur = ({ target }: FocusEvent<HTMLDivElement>) => {
    actions.updateLayer({
      layer: {
        ...layer,
        content: target.innerText
      },
      layerIds
    });
    setIsEditable(false);
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
        onDblClick={handleDblClick}
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
        <>
          {isEditable && (
            <CanvasPortal
              ref={textareaRef}
              height={dimension.height}
              left={textRef.current?.getAbsolutePosition().x}
              offsetLeft={textRef.current?.getStage()?.container().offsetLeft}
              offsetTop={textRef.current?.getStage()?.container().offsetTop}
              rotate={transform.rotate}
              top={textRef.current?.getAbsolutePosition().y}
              width={dimension.width}
            >
              <div
                contentEditable
                onBlur={handleTextareaBlur}
                suppressContentEditableWarning
                style={{
                  backgroundColor: '#ffffff',
                  bottom: -1,
                  border: '1px solid #000000',
                  boxSizing: 'border-box',
                  caretColor: 'black',
                  color: textStyle.color,
                  fontFamily: textStyle.fontFamily,
                  fontSize: textStyle.fontSize,
                  left: -1,
                  letterSpacing: textStyle.letterSpacing,
                  /**
                   * @todo textStyle에 lineHeight가 들어가는 경우에 수정 필요
                   */
                  lineHeight: 1,
                  overflow: 'hidden',
                  outline: 'none',
                  padding: 0,
                  pointerEvents: 'auto',
                  position: 'absolute',
                  right: -1,
                  textAlign: textStyle.textAlign,
                  top: -1,
                  whiteSpace: 'pre-wrap',
                }}
              >
                {textareaContent}
              </div>
            </CanvasPortal>
          )}
          <Transformer
            ref={transformerRef}
            centeredScaling
          />
        </>
      )}
    </Group>
  );
};

export default LayerText;
