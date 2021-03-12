import React, { Fragment, FunctionComponent, useMemo } from 'react';
import { bindActionCreators } from 'redux';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { makeStyles } from '@material-ui/core/styles';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import { CollageLayerGroup } from 'src/app/editor/shared/collage';
import { selectLayerIds } from 'src/app/editor/duck';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';

interface Props {
  parentLayerIds?: string[];
}

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const LayerList: FunctionComponent<Props> = ({ parentLayerIds = [] }) => {
  const { layerOrder, layers } = useAppSelector(({ editor }) =>
    parentLayerIds.reduce((collage, layerId) => {
      if (!collage?.layers[layerId]) {
        return {} as Omit<CollageLayerGroup, 'type'>;
      }
      return collage.layers[layerId] as Omit<CollageLayerGroup, 'type'>;
    }, editor.collage as Omit<CollageLayerGroup, 'type'>)
  );

  const dispatch = useAppDispatch();
  const actions = useMemo(() => bindActionCreators({ selectLayerIds }, dispatch), [dispatch]);

  const classes = useStyles();

  const handleClick = (layerIds: string[]) => {
    actions.selectLayerIds(layerIds);
  };

  const reversedLayerOrder = [...layerOrder].reverse();

  return (
    <List>
      {reversedLayerOrder.map((id) => {
        const key = `LayerList#${id}`;
        const layer = layers[id];
        if (!layer) {
          return null;
        }
        switch (layer.type) {
        case 'group': {
          return (
            <Fragment key={key}>
              <ListSubheader>
                {layer.metadata.title}
              </ListSubheader>
              <div className={classes.nested}>
                <LayerList
                  parentLayerIds={[...parentLayerIds, id]}
                />
              </div>
            </Fragment>
          );
        }

        case 'image': {
          return (
            <ListItem
              key={key}
              button
              onClick={handleClick.bind(null, [...parentLayerIds, id])}
            >
              <ListItemIcon>
                <InsertPhotoIcon />
              </ListItemIcon>
              <ListItemText primary={layer.metadata.title} />
            </ListItem>
          );
        }

        case 'text': {
          return (
            <ListItem
              key={key}
              button
              onClick={handleClick.bind(null, [...parentLayerIds, id])}
            >
              <ListItemIcon>
                <TextFieldsIcon />
              </ListItemIcon>
              <ListItemText primary={layer.metadata.title} />
            </ListItem>
          );
        }}
      })}
    </List>
  );
};

export default LayerList;
