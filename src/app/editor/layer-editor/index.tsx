import React, { FunctionComponent } from 'react';
import { Drawer, makeStyles, Typography } from '@material-ui/core';
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
        <Typography
          component="h3"
          variant="h6"
        >
          Layer Editor
        </Typography>
      </div>
    </Drawer>
  );
};

export default LayerEditor;
