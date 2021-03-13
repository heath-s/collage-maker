import { CollageLayer, CollageLayerImage, CollageLayerText, EditableCollageLayer } from '../shared/collage';
import { FormObject } from './index.d';

export const translateCollageLayerToForm = (collageLayer: CollageLayer): FormObject => {
  const form: FormObject = {
    title: collageLayer.metadata.title,
    dimension: {
      height: collageLayer.appearance.dimension.height,
      width: collageLayer.appearance.dimension.width,
    },
    position: {
      left: collageLayer.appearance.position.left,
      top: collageLayer.appearance.position.top,
    },
    transform: {
      rotate: collageLayer.appearance.transform.rotate,
    },
  };

  switch (collageLayer.type) {
  case 'group': {
    break;
  }

  case 'image': {
    const layer = collageLayer as CollageLayer<CollageLayerImage>;
    form.assetImageId = layer.assetImageId;
    break;
  }

  case 'text': {
    const layer = collageLayer as CollageLayer<CollageLayerText>;
    const { textStyle } = layer.appearance;
    form.textStyle = {
      color: textStyle.color,
      fontFamily: textStyle.fontFamily,
      fontSize: textStyle.fontSize,
      letterSpacing: textStyle.letterSpacing,
      textAlign: textStyle.textAlign,
    };
    form.content = layer.content;
    break;
  }}

  return form;
};

export const translateFormToCollageLayer = (
  form: FormObject, type: CollageLayer['type']
): EditableCollageLayer => {
  const collageLayer: EditableCollageLayer = {
    metadata: {
      title: form.title as string,
    },
    appearance: {
      dimension: {
        height: (form.dimension as FormObject).height as number,
        width: (form.dimension as FormObject).width as number,
      },
      position: {
        left: (form.position as FormObject).left as number,
        top: (form.position as FormObject).top as number,
      },
      transform: {
        rotate: (form.transform as FormObject).rotate as number,
      },
    },
  };

  switch (type) {
  case 'group': {
    break;
  }

  case 'image': {
    const layer = collageLayer as CollageLayer<CollageLayerImage>;
    layer.assetImageId = form.assetImageId as string;
    break;
  }

  case 'text': {
    const layer = collageLayer as CollageLayer<CollageLayerText>;
    layer.appearance.textStyle = {
      color: (form.textStyle as FormObject).color as string,
      fontFamily: (form.textStyle as FormObject).fontFamily as string,
      fontSize: (form.textStyle as FormObject).fontSize as number,
      letterSpacing: (form.textStyle as FormObject).letterSpacing as number,
      textAlign: (form.textStyle as FormObject).textAlign as 'left' | 'center' | 'right',
    };
    layer.content = form.content as string;
    break;
  }}

  return collageLayer;
};
