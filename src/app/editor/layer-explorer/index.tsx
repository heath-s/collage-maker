import React, { FunctionComponent } from 'react';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import { AppHeaderGap, drawerWidth } from 'src/app';
import { useAppSelector } from 'src/app/hooks';
import LayerList from './layer-list';

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
  const { collage } = useAppSelector(
    ({ editor }) => editor,
    (prev, next) => prev.updatedAt === next.updatedAt,
  );

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
        {collage && <LayerList />}
      </div>
    </Drawer>
  );
};

export default LayerExplorer;
