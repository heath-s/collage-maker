import React, { FunctionComponent } from 'react';
import { Text } from 'react-konva';
import { CollageLayerText } from '../shared/collage.d';
import { LayerProps } from './index.d';

type Props = LayerProps<CollageLayerText> & {

}

const LayerText: FunctionComponent<Props> = ({ layer: { appearance, content } }) => {
  const { dimension, position, textStyle, transform } = appearance;
  const centered = {
    offsetX: dimension.width / 2,
    offsetY: dimension.height / 2,
    x: position.left + dimension.width / 2,
    y: position.top + dimension.height / 2
  };

  return (
    <Text
      align={textStyle.textAlign}
      fill={textStyle.color}
      fontFamily={textStyle.fontFamily}
      fontSize={textStyle.fontSize}
      height={dimension.height}
      letterSpacing={textStyle.letterSpacing}
      offsetX={centered.offsetX}
      offsetY={centered.offsetY}
      rotation={transform.rotate}
      text={content}
      width={dimension.width}
      x={centered.x}
      y={centered.y}
    />
  );
};

export default LayerText;
