import React, { FunctionComponent, useMemo } from 'react';
import { bindActionCreators } from '@reduxjs/toolkit';
import { Drawer, makeStyles, Typography } from '@material-ui/core';
import { addImage, updateLayer } from 'src/app/editor/duck';
import { AppHeaderGap, drawerWidth } from 'src/app';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { CollageAssetImage, EditableCollageLayer } from '../shared/collage.d';
import { findCollageLayer } from '../shared/utils';
import GroupEditor from './group-editor';
import ImageEditor from './image-editor';
import TextEditor from './text-editor';

const useStyles = makeStyles(() => ({
  root: {
    width: drawerWidth,
    flexShrink: 0,
  },
  paper: {
    width: drawerWidth,
  },
  container: {
    overflow: 'auto',
  },
}));

const LayerEditor: FunctionComponent = () => {
  const { collage, currentLayerIds } = useAppSelector(
    ({ editor }) => editor,
    (prev, next) => (
      prev.currentLayerIds === next.currentLayerIds &&
      (
        findCollageLayer(prev.collage, prev.currentLayerIds) ===
        findCollageLayer(next.collage, next.currentLayerIds)
      )
    )
  );

  const dispatch = useAppDispatch();
  const actions = useMemo(
    () => bindActionCreators({ addImage, updateLayer }, dispatch), [dispatch]
  );

  const classes = useStyles();

  const handleImageAdded = (image: CollageAssetImage) => {
    actions.addImage({ image, layerIds: currentLayerIds || [] });
  };

  const handleChange = (collageLayer: EditableCollageLayer) => {
    actions.updateLayer({ layer: collageLayer, layerIds: currentLayerIds as string[] });
  };

  const currentLayer = currentLayerIds ?
    findCollageLayer(collage, currentLayerIds) :
    null;
  const $editor = useMemo(() => {
    if (!collage) {
      return null;
    }

    switch (currentLayer?.type) {
    case 'group': {
      return (
        <GroupEditor
          layer={currentLayer}
          onChange={handleChange}
        />
      );
    }

    case 'image': {
      return (
        <ImageEditor
          assetImages={collage.assets.images}
          layer={currentLayer}
          onImageAdded={handleImageAdded}
          onChange={handleChange}
        />
      );
    }

    case 'text': {
      return (
        <TextEditor
          layer={currentLayer}
          onChange={handleChange}
        />
      );
    }

    default: {
      return null;
    }}
  }, [currentLayer]);

  return (
    <Drawer
      anchor="right"
      variant="permanent"
      className={classes.root}
      classes={{
        paper: classes.paper,
      }}
    >
      <AppHeaderGap />
      <div className={classes.container}>
        <Typography
          component="h3"
          variant="h6"
        >
          Layer Editor
        </Typography>

        {$editor}
      </div>
    </Drawer>
  );
};

export default LayerEditor;
