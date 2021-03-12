import React, { FunctionComponent } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { AppHeaderGap } from 'src/app';
import { useAppSelector } from 'src/app/hooks';

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
  const editor = useAppSelector(({ editor }) => editor);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppHeaderGap />

      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.grid}
      >
        <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{JSON.stringify(editor)}</pre>
      </Grid>
    </div>
  );
};

export default Canvas;
