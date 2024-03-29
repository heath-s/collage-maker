import { CollageLayer, CollageLayerImage, CollageLayerText, EditableCollageLayer } from '../shared/collage.d';
import { FormObject } from './index.d';

export const translateCollageLayerToForm = (collageLayer: CollageLayer): FormObject => {
  const form: FormObject = {
    title: collageLayer.metadata.title,
    position: {
      left: collageLayer.appearance.position.left,
      top: collageLayer.appearance.position.top,
    },
  };

  switch (collageLayer.type) {
  case 'group': {
    break;
  }

  case 'image': {
    const layer = collageLayer as CollageLayer<CollageLayerImage>;
    form.alpha = layer.appearance.alpha;
    form.assetImageId = layer.assetImageId;
    form.compositeOperation = layer.appearance.compositeOperation;
    form.dimension = {
      height: collageLayer.appearance.dimension.height,
      width: collageLayer.appearance.dimension.width,
    };
    form.isAssetReplaceable = !!layer.metadata.isAssetReplaceable as boolean;
    form.transform = {
      rotate: collageLayer.appearance.transform.rotate,
    };
    break;
  }

  case 'text': {
    const layer = collageLayer as CollageLayer<CollageLayerText>;
    const { textStyle } = layer.appearance;
    form.content = layer.content;
    form.dimension = {
      height: collageLayer.appearance.dimension.height,
      width: collageLayer.appearance.dimension.width,
    };
    form.textStyle = {
      color: textStyle.color,
      fontFamily: textStyle.fontFamily,
      fontSize: textStyle.fontSize,
      letterSpacing: textStyle.letterSpacing,
      textAlign: textStyle.textAlign,
    };
    form.transform = {
      rotate: collageLayer.appearance.transform.rotate,
    };
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
      position: {
        left: (form.position as FormObject).left as number,
        top: (form.position as FormObject).top as number,
      },
    },
  };

  switch (type) {
  case 'group': {
    break;
  }

  case 'image': {
    const layer = collageLayer as CollageLayer<CollageLayerImage>;
    layer.appearance.alpha = form.alpha as number;
    layer.appearance.compositeOperation = form.compositeOperation as string;
    layer.appearance.dimension = {
      height: (form.dimension as FormObject).height as number,
      width: (form.dimension as FormObject).width as number,
    };
    layer.appearance.transform = {
      rotate: (form.transform as FormObject).rotate as number,
    };
    layer.assetImageId = form.assetImageId as string;
    layer.metadata.isAssetReplaceable = form.isAssetReplaceable as boolean;
    break;
  }

  case 'text': {
    const layer = collageLayer as CollageLayer<CollageLayerText>;
    layer.appearance.dimension = {
      height: (form.dimension as FormObject).height as number,
      width: (form.dimension as FormObject).width as number,
    };
    layer.appearance.textStyle = {
      color: (form.textStyle as FormObject).color as string,
      fontFamily: (form.textStyle as FormObject).fontFamily as string,
      fontSize: (form.textStyle as FormObject).fontSize as number,
      letterSpacing: (form.textStyle as FormObject).letterSpacing as number,
      textAlign: (form.textStyle as FormObject).textAlign as 'left' | 'center' | 'right',
    };
    layer.appearance.transform = {
      rotate: (form.transform as FormObject).rotate as number,
    };
    layer.content = form.content as string;
    break;
  }}

  return collageLayer;
};
