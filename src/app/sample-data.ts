import { Collage } from './editor/shared/collage.d';

export default {
  metadata: {
    id: 'PIXO_COLLAGE_MAKER_SAMPLE_DATA',
    title: 'Collage Maker Sample'
  },
  assets: {
    images: {
      'template_scrapbook_2_1_blending_multiply': {
        id: 'template_scrapbook_2_1_blending_multiply',
        content: '/assets/templates/template_scrapbook_2_1_blending_multiply.png',
        metadata: {
          mimeType: 'image/png',
          title: 'Lighting Effect'
        }
      },
      'template_scrapbook_2_1_image': {
        id: 'template_scrapbook_2_1_image',
        content: '/assets/templates/template_scrapbook_2_1_image.png',
        metadata: {
          mimeType: 'image/png',
          title: 'ReplaceableImage 1'
        }
      },
      'template_scrapbook_2_2_image': {
        id: 'template_scrapbook_2_2_image',
        content: '/assets/templates/template_scrapbook_2_2_image.png',
        metadata: {
          mimeType: 'image/png',
          title: 'ReplaceableImage 2'
        }
      },
      'template_scrapbook_2_3_imagex': {
        id: 'template_scrapbook_2_3_image-x',
        content: '/assets/templates/template_scrapbook_2_3_image-x.png',
        metadata: {
          mimeType: 'image/png',
          title: 'Background Image'
        }
      }
    }
  },
  dimension: {
    height: 596,
    width: 335
  },
  layers: {
    'layer-1': {
      id: 'layer-1',
      metadata: {
        title: 'Background'
      },
      type: 'group',
      layers: {
        'layer-1-1': {
          id: 'layer-1-1',
          metadata: {
            title: 'Background Image'
          },
          type: 'image',
          assetImageId: 'template_scrapbook_2_3_image-x',
          appearance: {
            dimension: {
              height: 596,
              width: 335
            },
            position: {
              left: 0,
              top: 0
            },
            transform: {
              rotate: 0
            }
          }
        },
        'layer-1-2': {
          id: 'layer-1-2',
          metadata: {
            title: 'Lighting Effect'
          },
          type: 'image',
          assetImageId: 'template_scrapbook_2_1_blending_multiply',
          appearance: {
            dimension: {
              height: 596,
              width: 335
            },
            position: {
              left: 0,
              top: 0
            },
            transform: {
              rotate: 0
            }
          }
        }
      },
      layerOrder: ['layer-1-1', 'layer-1-2'],
      appearance: {
        dimension: {
          height: 596,
          width: 335
        },
        position: {
          left: 0,
          top: 0
        },
        transform: {
          rotate: 0
        }
      }
    },
    'layer-2': {
      id: 'layer-2',
      metadata: {
        title: 'Text "2020"'
      },
      type: 'text',
      appearance: {
        textStyle: {
          color: '#666666',
          fontFamily: 'Amiri',
          fontSize: 24,
          letterSpacing: 0,
          textAlign: 'center'
        },
        dimension: {
          height: 32,
          width: 120
        },
        position: {
          left: 100,
          top: 150
        },
        transform: {
          rotate: 0
        }
      },
      content: '2020'
    },
    'layer-3': {
      id: 'layer-3',
      metadata: {
        title: 'Text "Summer"'
      },
      type: 'text',
      appearance: {
        textStyle: {
          color: '#666666',
          fontFamily: 'Amiri',
          fontSize: 48,
          letterSpacing: 0,
          textAlign: 'center'
        },
        dimension: {
          height: 64,
          width: 240
        },
        position: {
          left: 50,
          top: 200
        },
        transform: {
          rotate: 0
        }
      },
      content: 'Summer'
    },
    'layer-4': {
      id: 'layer-4',
      metadata: {
        title: 'ReplaceableImage 1'
      },
      type: 'image',
      assetImageId: 'template_scrapbook_2_2_image',
      appearance: {
        dimension: {
          height: 246,
          width: 192
        },
        position: {
          left: 5,
          top: 300
        },
        transform: {
          rotate: 0
        }
      }
    },
    'layer-5': {
      id: 'layer-5',
      metadata: {
        title: 'ReplaceableImage 2'
      },
      type: 'image',
      assetImageId: 'template_scrapbook_2_1_image',
      appearance: {
        dimension: {
          height: 237,
          width: 177
        },
        position: {
          left: 45,
          top: 200
        },
        transform: {
          rotate: 0
        }
      }
    }
  },
  layerOrder: ['layer-1', 'layer-2', 'layer-3', 'layer-4', 'layer-5']
} as Collage;
