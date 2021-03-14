import { createContext } from 'react';
import Konva from 'konva';

interface Context {
  setStage: (stage: Konva.Stage) => void;
}

export const EditorContext = createContext<Context>({
  setStage: () => null,
});
