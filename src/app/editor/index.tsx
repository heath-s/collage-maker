import React, { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/core';
import Canvas from './canvas';
import LayerEditor from './layer-editor';
import LayerExplorer from './layer-explorer';
import './index.scss';

export const drawerWidth = 240;

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
  layerExplorer: {
    order: 1,
    width: drawerWidth,
  },
  canvas: {
    flexGrow: 1,
    order: 2,
  },
  layerEditor: {
    order: 3,
    width: drawerWidth,
  },
}));

const Editor: FunctionComponent = () => {
  const classes = useStyles();

  /**
   * @todo Font pre-loading
   * 현재는 폰트 첫 로딩 전에 Canvas에 적용이 되지 않음.
   * Font 파일 로드 중 LoadingIndicator 표시 후, 로드 완료 후 Editor 표시하는 것으로 변경
   */

  return (
    <div className={classes.root}>
      <aside className={classes.layerExplorer}>
        <LayerExplorer />
      </aside>

      <aside className={classes.layerEditor}>
        <LayerEditor />
      </aside>

      <main className={classes.canvas}>
        <Canvas />
      </main>
    </div>
  );
};

export default Editor;
