type UUID = string;

interface CollageLayerGroup {
  type: 'group';
  layers: { [id: UUID]: CollageLayer };
  layerOrder: UUID[];
}

interface CollageLayerImage {
  type: 'image';
  assetImageId: UUID;
  /**
   * @todo Blending 효과 등
   */
}

interface CollageLayerText {
  type: 'text';
  appearance: {
    textStyle: {
      color: string;
      fontFamily: string;
      fontSize: number;
      letterSpacing: number;
      textAlign: 'left' | 'center' | 'right';
    };
  };
  content: string;
}

type CollageLayer = {
  id: UUID;
  metadata: {
    title: string;
  };
} & (
  CollageLayerGroup | CollageLayerImage | CollageLayerText
) & {
  appearance: {
    dimension: {
      height: number;
      width: number;
    }
    position: {
      left: number;
      top: number;
    };
    transform: {
      rotate: number;
    }
  }
};

interface CollageAssetImage {
  id: UUID;
  /**
   * 이미지 내용은 지금 단계에서는 Base64 혹은 이미지 경로로 처리
   */
  content: string;
  metadata: {
    mimeType: string;
    title: string;
  }
}

export interface Collage {
  assets: {
    images: { [id: UUID]: CollageAssetImage }
  };
  dimension: {
    height: number;
    width: number;
  };
  layers: { [id: UUID]: CollageLayer };
  layerOrder: UUID[];
  metadata: {
    id: UUID;
    title: string;
  };
}
