import { CollageLayer } from '../shared/collage.d';

export type FormObject = {
  [key: string]: boolean | string | number | FormObject;
};

export interface EditorProps {
  layer: CollageLayer;
  onChange: (collageLayer: Omit<CollageLayer, 'id' | 'type'>) => void;
}
