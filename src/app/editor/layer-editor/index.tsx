import React, { FunctionComponent } from 'react';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
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

const LayerEditor: FunctionComponent = () => {
  const classes = useStyles();

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
        LayerEditor
      </div>
    </Drawer>
  );
};

export default LayerEditor;
