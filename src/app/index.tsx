import React, { FunctionComponent, useMemo } from 'react';
import { bindActionCreators } from 'redux';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Collage } from './editor/shared/collage';
import Editor from './editor';
import { loadSample } from './editor/duck';
import sampleData from './sample-data';
import { useAppDispatch } from './hooks';

export const AppHeaderGap: FunctionComponent = () => (
  <Toolbar variant="dense" />
);

export const drawerWidth = 240;

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
            샘플 데이터 불러오기
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
