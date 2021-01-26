import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as sagaMiddlewareRunners from './sagas';
import { dataStoreReducer, initDataStore } from './_data.reducer';
import { appStoreReducer, initAppStore } from './_app.reducer';
import { IStore } from './store.interface';
import { Nullable } from '@domain/interfaces';
import { env } from '@env';

export const reducers = combineReducers({ data: dataStoreReducer, app: appStoreReducer });
const sagaMiddleware = createSagaMiddleware();
export const initStore: Nullable<IStore> = {
  data: initDataStore,
  app: initAppStore,
};

const preloadedState: IStore =
  typeof window !== 'undefined' && (window as any).__PRELOADED_STATE__
    ? (window as any).__PRELOADED_STATE__
    : initStore;

// @ts-ignore
export const store = createStore<IStore>(
  reducers,
  preloadedState,
  composeWithDevTools({
    actionsBlacklist: [],
    trace: !env.PRODUCTION,
    traceLimit: 20
  })(applyMiddleware(sagaMiddleware)),
);

Object.keys(sagaMiddlewareRunners).forEach((runner: any) => {
  sagaMiddleware.run((sagaMiddlewareRunners as any)[runner]);
});

export * from './_app.reducer';
export * from './_data.reducer';
export * from './actions';
export * from './sagas';
export * from './store.interface';
export * from './store.enum';
