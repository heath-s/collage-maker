import React, { FunctionComponent, useEffect, useMemo } from 'react';
import { bindActionCreators } from 'redux';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { AppHeaderGap } from 'src/app';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { tickAll } from '../duck';

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
  const state = useAppSelector((state) => state.editor);

  const dispatch = useAppDispatch();
  const actions = useMemo(() => bindActionCreators({ tickAll }, dispatch), [dispatch]);

  const classes = useStyles();

  /**
   * @todo 제거
   */
  useEffect(() => {
    const interval = window.setInterval(() => {
      actions.tickAll();
    }, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  return (
    <div className={classes.root}>
      <AppHeaderGap />

      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.grid}
      >
        <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{JSON.stringify(state)}</pre>
      </Grid>
    </div>
  );
};

export default Canvas;
