import { IStoreState } from './types';

export const appSelector = (state: IStoreState) => state.app;

export const appStatusSelector = (state: IStoreState) => state.app.appState;
