import React, { FunctionComponent } from 'react';
import { Group } from 'react-konva';
import { CollageLayerGroup } from '../shared/collage.d';
import { LayerProps } from './index.d';
import LayerImage from './layer-image';
import LayerText from './layer-text';

type Props = LayerProps<CollageLayerGroup> & {

}

const LayerGroup: FunctionComponent<Props> = ({ layer: { layerOrder, layers } }) => {
  return (
    <Group>
      {layerOrder.map((id) => {
        const key = `LayerGroup#${id}`;
        const layer = layers[id];
        if (!layer) {
          return null;
        }

        switch (layer.type) {
        case 'group': {
          return (
            <LayerGroup
              key={key}
              layer={layer}
            />
          );
        }

        case 'image': {
          return (
            <LayerImage
              key={key}
              layer={layer}
            />
          );
        }

        case 'text': {
          return (
            <LayerText
              key={key}
              layer={layer}
            />
          );
        }}
      })}
    </Group>
  );
};

export default LayerGroup;
