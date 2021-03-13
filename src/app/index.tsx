import React, { FunctionComponent, useMemo } from 'react';
import { AppBar, Button, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import { Collage } from './editor/shared/collage';
import Editor from './editor';
import { loadSample } from './editor/duck';
import sampleData from './sample-data';
import { useAppDispatch } from './hooks';

export const AppHeaderGap: FunctionComponent = () => (
  <Toolbar variant="dense" />
);

export const drawerWidth = 320;

const useStyles = makeStyles((theme) => ({
  header: {
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const App: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const actions = useMemo(() => bindActionCreators({ loadSample }, dispatch), [dispatch]);

  const classes = useStyles();

  const handleClickLoadSample = () => {
    actions.loadSample(sampleData as Collage);
  };

  return (
    <>
      <AppBar
        position="fixed"
        className={classes.header}
      >
        <Toolbar variant="dense">
          <Typography variant="h6" className={classes.title}>
            Collage Maker
          </Typography>

          <Button
            color="inherit"
            onClick={handleClickLoadSample}
          >
            샘플 템플릿 불러오기
          </Button>
        </Toolbar>
      </AppBar>

      {/**
        * @todo Router 적용하여 SPA 구현
        */}
      <Editor />
    </>
  );
};

export default App;
