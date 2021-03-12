import React, { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Editor from './editor';

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
  const classes = useStyles();

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
