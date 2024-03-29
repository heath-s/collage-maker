import React, { FunctionComponent, useContext } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import Konva from 'konva';
import { Layer, Stage } from 'react-konva';
import { Provider, ReactReduxContext } from 'react-redux';
import { AppHeaderGap } from 'src/app';
import { useAppSelector } from 'src/app/hooks';
import { EditorContext } from 'src/app/editor/context';
import { CollageLayer, CollageLayerGroup } from '../shared/collage.d';
import LayerGroup from './layer-group';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  grid: {
    flexGrow: 1,
  }
}));

const Canvas: FunctionComponent = () => {
  const collage = useAppSelector(({ editor }) => editor.collage);

  const editorContext = useContext(EditorContext);

  const classes = useStyles();

  const setStageRef = (ref: Konva.Stage | null) => {
    if (ref) {
      editorContext.setStage(ref);
    }
  };

  return (
    <div className={classes.root}>
      <AppHeaderGap />

      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.grid}
      >
        {collage && (
          <ReactReduxContext.Consumer>
            {({ store }) => (
              <Stage
                ref={(ref) => setStageRef(ref)}
                height={596}
                width={335}
              >
                <Provider store={store}>
                  <Layer>
                    <LayerGroup
                      layer={collage as unknown as CollageLayer<CollageLayerGroup>}
                      layerIds={[]}
                    />
                  </Layer>
                </Provider>
              </Stage>
            )}
          </ReactReduxContext.Consumer>
        )}
      </Grid>
    </div>
  );
};

export default Canvas;
