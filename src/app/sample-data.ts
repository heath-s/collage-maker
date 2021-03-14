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
      'template_scrapbook_2_3_image-x': {
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
            alpha: 1,
            compositeOperation: 'none',
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
            alpha: 1,
            compositeOperation: 'multiply',
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
        title: '2020'
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
          height: 22,
          width: 64
        },
        position: {
          left: 128,
          top: 105
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
        title: 'SUMMER'
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
          height: 38,
          width: 184
        },
        position: {
          left: 73,
          top: 130
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
        title: 'ReplaceableImageGroup 1'
      },
      type: 'group',
      layers: {
        'layer-4-1': {
          id: 'layer-4-1',
          metadata: {
            title: 'ReplaceableImage 1 Background'
          },
          type: 'image',
          assetImageId: 'template_scrapbook_2_2_image',
          appearance: {
            alpha: 1,
            compositeOperation: 'none',
            dimension: {
              height: 369,
              width: 288
            },
            position: {
              left: 99,
              top: 339
            },
            transform: {
              rotate: 0
            }
          }
        },
        'layer-4-2': {
          id: 'layer-4-2',
          metadata: {
            title: 'ReplaceableImageGroup 1'
          },
          type: 'image',
          assetImageId: '',
          appearance: {
            alpha: 1,
            compositeOperation: 'none',
            dimension: {
              height: 216,
              width: 172
            },
            position: {
              left: 144,
              top: 420
            },
            transform: {
              rotate: -6
            }
          }
        }
      },
      layerOrder: ['layer-4-1', 'layer-4-2'],
      appearance: {
        alpha: 1,
        compositeOperation: 'none',
        dimension: {
          height: 369,
          width: 288
        },
        position: {
          left: 99,
          top: 339
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
      type: 'group',
      layers: {
        'layer-5-1': {
          id: 'layer-5-1',
          metadata: {
            title: 'ReplaceableImage 2 Background'
          },
          type: 'image',
          assetImageId: 'template_scrapbook_2_1_image',
          appearance: {
            alpha: 1,
            compositeOperation: 'none',
            dimension: {
              height: 356,
              width: 266
            },
            position: {
              left: -34,
              top: 186
            },
            transform: {
              rotate: 0
            }
          }
        },
        'layer-5-2': {
          id: 'layer-5-2',
          metadata: {
            title: 'ReplaceableImage 2'
          },
          type: 'image',
          assetImageId: '',
          appearance: {
            alpha: 1,
            compositeOperation: 'none',
            dimension: {
              height: 216,
              width: 172
            },
            position: {
              left: 32,
              top: 238
            },
            transform: {
              rotate: 10
            }
          }
        }
      },
      layerOrder: ['layer-5-1', 'layer-5-2'],
      appearance: {
        alpha: 1,
        compositeOperation: 'none',
        dimension: {
          height: 356,
          width: 266
        },
        position: {
          left: -34,
          top: 186
        },
        transform: {
          rotate: 0
        }
      }
    }
  },
  layerOrder: ['layer-1', 'layer-2', 'layer-3', 'layer-4', 'layer-5']
} as Collage;
