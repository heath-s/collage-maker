import React, { FunctionComponent } from 'react';
import { Text } from 'react-konva';
import { CollageLayerText } from '../shared/collage.d';
import { LayerProps } from './index.d';

type Props = LayerProps<CollageLayerText> & {

}

const LayerText: FunctionComponent<Props> = ({ layer: { appearance, content } }) => {
  const { dimension, position, textStyle, transform } = appearance;

  return (
    <Text
      align={textStyle.textAlign}
      fill={textStyle.color}
      fontFamily={textStyle.fontFamily}
      fontSize={textStyle.fontSize}
      height={dimension.height}
      letterSpacing={textStyle.letterSpacing}
      rotation={transform.rotate}
      text={content}
      width={dimension.width}
      x={position.left}
      y={position.top}
    />
  );
};

export default LayerText;
