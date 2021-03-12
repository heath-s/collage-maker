import React, { FunctionComponent } from 'react';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core';
import { AppHeaderGap, drawerWidth } from 'src/app';

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

const LayerExplorer: FunctionComponent = () => {
  const classes = useStyles();

  return (
    <Drawer
      anchor="left"
      variant="permanent"
      className={classes.root}
      classes={{
        paper: classes.paper,
      }}
    >
      <AppHeaderGap />
      <div className={classes.container}>
        LayerExplorer
      </div>
    </Drawer>
  );
};

export default LayerExplorer;
