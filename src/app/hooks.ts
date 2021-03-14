import { Store } from 'redux';
import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from 'react-redux';
import { RootState, AppDispatch } from 'src/app/store';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => Store<RootState> = useStore;
