import React, { Fragment, FunctionComponent, useMemo } from 'react';
import AddIcon from '@material-ui/icons/Add';
import { bindActionCreators } from 'redux';
import { changeLayerOrder, selectLayerIds } from 'src/app/editor/duck';
import { Divider, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { selectNestedLayer } from '../shared/selectors';
import { Collage, CollageLayer, CollageLayerGroup } from '../shared/collage';
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
  const actions = useMemo(() => bindActionCreators({
    changeLayerOrder, selectLayerIds,
  }, dispatch), [dispatch]);

  const classes = useStyles();

  const handleClick = (layerIds: string[]) => {
    actions.selectLayerIds(layerIds);
  };
  const handleClickDown = (layerIds: string[]) => {
    actions.changeLayerOrder({ direction: -1, layerIds });
  };
  const handleClickUp = (layerIds: string[]) => {
    actions.changeLayerOrder({ direction: 1, layerIds });
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

      {reversedLayerOrder.map((id, reversedIndex) => {
        const key = `LayerList#${id}`;
        const index = layerOrder.length - 1 - reversedIndex;
        const layer = layers[id];
        if (!layer) {
          return null;
        }

        /**
         * @todo Layer 순서 변경 기능
         */
        const layerIds = [...parentLayerIds, id];
        switch (layer.type) {
        case 'group': {
          return (
            <Fragment key={key}>
              <Divider />
              <LayerItem
                isBottom={index === 0}
                isTop={index === layerOrder.length - 1}
                layerIds={layerIds}
                onClick={handleClick.bind(null, layerIds)}
                onClickDown={handleClickDown.bind(null, layerIds)}
                onClickUp={handleClickUp.bind(null, layerIds)}
              />
              <div className={classes.nested}>
                <LayerList
                  parentLayerIds={[...parentLayerIds, id]}
                />
              </div>
              <Divider />
            </Fragment>
          );
        }

        case 'image':
        case 'text': {
          return (
            <LayerItem
              key={key}
              isBottom={index === 0}
              isTop={index === layerOrder.length - 1}
              layerIds={layerIds}
              onClick={handleClick.bind(null, layerIds)}
              onClickDown={handleClickDown.bind(null, layerIds)}
              onClickUp={handleClickUp.bind(null, layerIds)}
            />
          );
        }}
      })}
    </List>
  );
};

export default LayerList;
