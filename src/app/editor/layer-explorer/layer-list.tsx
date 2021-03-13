import React, { Fragment, FunctionComponent, useMemo } from 'react';
import AddIcon from '@material-ui/icons/Add';
import { bindActionCreators } from 'redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { makeStyles } from '@material-ui/core/styles';
import { selectLayerIds } from 'src/app/editor/duck';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { Collage, CollageLayer, CollageLayerGroup } from '../shared/collage';
import { selectNestedLayer } from '../shared/selectors';
import LayerItem from './layer-item';

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
    selectNestedLayer(editor.collage, parentLayerIds) as Collage | CollageLayer<CollageLayerGroup>
  ) || { layerOrder: [], layers: {} };

  const dispatch = useAppDispatch();
  const actions = useMemo(() => bindActionCreators({ selectLayerIds }, dispatch), [dispatch]);

  const classes = useStyles();

  const handleClick = (layerIds: string[]) => {
    actions.selectLayerIds(layerIds);
  };

  const reversedLayerOrder = [...layerOrder].reverse();

  return (
    <List>
      {/**
        * @todo 레이어 추가 기능
        */}
      <ListItem
        button
        onClick={() => alert('미구현된 기능')}
      >
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText
          primary="레이어 추가"
          primaryTypographyProps={{ noWrap: true }}
        />
      </ListItem>

      {reversedLayerOrder.map((id) => {
        const key = `LayerList#${id}`;
        const layer = layers[id];
        if (!layer) {
          return null;
        }

        /**
         * @todo Component 분리할 필요가 있음
         */
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

        case 'image':
        case 'text': {
          return (
            <LayerItem
              key={key}
              layerIds={[...parentLayerIds, id]}
              onClick={handleClick.bind(null, [...parentLayerIds, id])}
            />
          );
        }}
      })}
    </List>
  );
};

export default LayerList;
