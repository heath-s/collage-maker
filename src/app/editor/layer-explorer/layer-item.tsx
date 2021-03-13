import React, { FunctionComponent } from 'react';
import { InsertPhoto as InsertPhotoIcon, TextFields as TextFieldsIcon } from '@material-ui/icons';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useAppSelector } from 'src/app/hooks';
import { CollageLayer } from '../shared/collage';
import { selectNestedLayer } from '../shared/selectors';

interface Props {
  layerIds: string[];
  onClick: (layerIds: string[]) => void;
}

const LayerItem: FunctionComponent<Props> = ({
  layerIds = [], onClick = () => null,
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

  const { metadata, type } = layer;
  switch (type) {
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
      </ListItem>
    );
  }

  default: {
    return null;
  }}
};

export default LayerItem;
