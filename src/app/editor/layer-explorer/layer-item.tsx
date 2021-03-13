import React, { FunctionComponent } from 'react';
import { IconButton, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import { ArrowDownward as ArrowDownwardIcon, ArrowUpward as ArrowUpwardIcon, Collections as CollectionsIcon, InsertPhoto as InsertPhotoIcon, TextFields as TextFieldsIcon } from '@material-ui/icons';
import { useAppSelector } from 'src/app/hooks';
import { CollageLayer } from '../shared/collage';
import { selectNestedLayer } from '../shared/selectors';

interface Props {
  isBottom: boolean;
  isTop: boolean;
  layerIds: string[];
  onClick: (layerIds: string[]) => void;
  onClickDown: (layerIds: string[]) => void;
  onClickUp: (layerIds: string[]) => void;
}

const LayerItem: FunctionComponent<Props> = ({
  isBottom = false,
  isTop = false,
  layerIds = [],
  onClick = () => null,
  onClickDown = () => null,
  onClickUp = () => null,
}) => {
  const layer = (
    useAppSelector(({ editor }) =>
      selectNestedLayer(editor.collage, layerIds)
    ) || {}
  ) as CollageLayer;
  const selected = useAppSelector(({ editor }) => {
    const selected = editor.currentLayerIds?.[editor.currentLayerIds?.length - 1];
    return selected === layer.id;
  });

  const handleClick = () => {
    onClick(layerIds);
  };

  const handleClickDown = () => {
    onClickDown(layerIds);
  };

  const handleClickUp = () => {
    onClickUp(layerIds);
  };

  const { metadata, type } = layer;
  switch (type) {
  case 'group': {
    return (
      <ListItem
        button
        onClick={handleClick}
        selected={selected}
      >
        <ListItemIcon>
          <CollectionsIcon />
        </ListItemIcon>
        <ListItemText
          primary={metadata.title}
          primaryTypographyProps={{ noWrap: true }}
        />
        <ListItemSecondaryAction>
          {!isTop && (
            <IconButton
              onClick={handleClickUp}
            >
              <ArrowUpwardIcon />
            </IconButton>
          )}
          {!isBottom && (
            <IconButton
              onClick={handleClickDown}
            >
              <ArrowDownwardIcon />
            </IconButton>
          )}
        </ListItemSecondaryAction>
      </ListItem>
    );
  }

  case 'image': {
    return (
      <ListItem
        button
        onClick={handleClick}
        selected={selected}
      >
        <ListItemIcon>
          <InsertPhotoIcon />
        </ListItemIcon>
        <ListItemText
          primary={metadata.title}
          primaryTypographyProps={{ noWrap: true }}
        />
        <ListItemSecondaryAction>
          {!isTop && (
            <IconButton
              onClick={handleClickUp}
            >
              <ArrowUpwardIcon />
            </IconButton>
          )}
          {!isBottom && (
            <IconButton
              onClick={handleClickDown}
            >
              <ArrowDownwardIcon />
            </IconButton>
          )}
        </ListItemSecondaryAction>
      </ListItem>
    );
  }

  case 'text': {
    return (
      <ListItem
        button
        onClick={handleClick}
        selected={selected}
      >
        <ListItemIcon>
          <TextFieldsIcon />
        </ListItemIcon>
        <ListItemText
          primary={metadata.title}
          primaryTypographyProps={{ noWrap: true }}
        />
        <ListItemSecondaryAction>
          {!isTop && (
            <IconButton
              onClick={handleClickUp}
            >
              <ArrowUpwardIcon />
            </IconButton>
          )}
          {!isBottom && (
            <IconButton
              onClick={handleClickDown}
            >
              <ArrowDownwardIcon />
            </IconButton>
          )}
        </ListItemSecondaryAction>
      </ListItem>
    );
  }

  default: {
    return null;
  }}
};

export default LayerItem;
