import React, { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/core';
import Canvas from './canvas';
import LayerEditor from './layer-editor';
import LayerExplorer from './layer-explorer';
import './index.scss';

export const drawerWidth = 240;

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
  layerExplorer: {
    order: 1,
    width: drawerWidth,
  },
  canvas: {
    flexGrow: 1,
    order: 2,
  },
  layerEditor: {
    order: 3,
    width: drawerWidth,
  },
}));

const Editor: FunctionComponent = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <aside className={classes.layerExplorer}>
        <LayerExplorer />
      </aside>

      <aside className={classes.layerEditor}>
        <LayerEditor />
      </aside>

      <main className={classes.canvas}>
        <Canvas />
      </main>
    </div>
  );
};

export default Editor;
