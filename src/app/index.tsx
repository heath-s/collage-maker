import React, { FunctionComponent, useMemo, useState } from 'react';
import { AppBar, Button, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import { Collage } from './editor/shared/collage.d';
import Editor from './editor';
import { loadSample } from './editor/duck';
import sampleData from './sample-data';
import { useAppDispatch, useAppStore } from './hooks';
import { EditorContext } from './editor/context';
import Konva from 'konva';

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
  const store = useAppStore();

  const dispatch = useAppDispatch();
  const actions = useMemo(
    () => bindActionCreators({ loadSample }, dispatch), [dispatch]
  );

  const [stage, setStage] = useState<Konva.Stage | null>(null);

  const classes = useStyles();

  const handleClickLoadSample = () => {
    actions.loadSample(sampleData as Collage);
  };

  const handleClickSave = (ratio: number, ext: string) => {
    if (!stage) {
      return;
    }

    let mimeType: string;
    switch (ext) {
    case 'jpg': {
      mimeType = 'image/jpeg';
      break;
    }

    case 'png':
    default: {
      mimeType = 'image/png';
      break;
    }}
    const uri = stage.toDataURL({
      mimeType,
      pixelRatio: ratio,
    });
    const link = document.createElement('a');
    link.download = `${store.getState().editor.collage?.metadata.title}.${ext}`;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSetStage = (stage: Konva.Stage) => {
    setStage(stage);
  };

  return (
    <EditorContext.Provider value={{ setStage: handleSetStage }}>
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
            onClick={handleClickSave.bind(null, 1, 'png')}
          >
            PNG
          </Button>
          <Button
            color="inherit"
            onClick={handleClickSave.bind(null, 2, 'png')}
          >
            PNG &times;2
          </Button>
          <Button
            color="inherit"
            onClick={handleClickSave.bind(null, 3, 'png')}
          >
            PNG &times;3
          </Button>

          <Button
            color="inherit"
            onClick={handleClickSave.bind(null, 1, 'jpg')}
          >
            JPG
          </Button>
          <Button
            color="inherit"
            onClick={handleClickSave.bind(null, 2, 'jpg')}
          >
            JPG &times; 2
          </Button>
          <Button
            color="inherit"
            onClick={handleClickSave.bind(null, 3, 'jpg')}
          >
            JPG &times; 3
          </Button>

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
    </EditorContext.Provider>
  );
};

export default App;
