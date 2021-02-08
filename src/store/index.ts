import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as sagaMiddlewareRunners from './sagas';
import { dataStoreReducer, initDataStore } from './_data.reducer';
import { appStoreReducer, initAppStore } from './_app.reducer';
import { IStore } from './store.interface';
import { Nullable } from '@domain/interfaces';
import { env } from '@env';
import { EActionTypes } from './store.enum';
import { MDocuments } from '@domain/models';

export const reducers = combineReducers({ data: dataStoreReducer, app: appStoreReducer });
export const initStore: Nullable<IStore> = {
  data: initDataStore,
  app: initAppStore,
};

const _preloadState = typeof window !== 'undefined' && window.__PRELOADED_STATE__;
const sagaMiddleware = createSagaMiddleware();
const preloadedState = Object.assign(initStore, _preloadState && (window.__PRELOADED_STATE__ as Nullable<IStore>));

// type casting
if (_preloadState) {
  if (preloadedState.data?.client) {
    preloadedState.data.client.documents = Object.assign(
      new MDocuments({}, true),
      preloadedState.data?.client?.documents,
    );
  }
}

// @ts-ignore
export const store = createStore<IStore>(
  reducers,
  preloadedState,
  composeWithDevTools({
    trace: !env.PRODUCTION,
    traceLimit: 20,
    predicate: (state, action) =>
      !(
        [EActionTypes.fetchPrices, EActionTypes.savePrices, EActionTypes.requestSuccess].includes(action.type) &&
        !!(state as any).data.prices
      ),
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
