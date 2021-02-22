import { Nullable } from '@domain/interfaces';
import * as Model from '@domain/models';
import * as Action from './actions';
import { env } from '@env';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import * as sagaMiddlewareRunners from './sagas';
import { EActionTypes } from './store.enum';
import { IAction, IStore } from './store.interface';
import { appStoreReducer, initAppStore } from './_app.reducer';
import { dataStoreReducer, initDataStore } from './_data.reducer';
import { ssrStoreReducer } from './_ssr.reducer';
import { batch } from 'react-redux';

export const reducers = combineReducers({ data: dataStoreReducer, app: appStoreReducer, ssr: ssrStoreReducer });
export const initStore: Nullable<IStore> = {
  data: initDataStore,
  app: initAppStore,
};

const _ssrState = typeof window !== 'undefined' && window.__PRELOADED_STATE__;
const sagaMiddleware = createSagaMiddleware();

// @ts-ignore
export const store = createStore<IStore>(
  reducers,
  initStore,
  composeWithDevTools({
    trace: !env.PRODUCTION,
    traceLimit: 20,
    predicate: (state, action) =>
      !(
        [EActionTypes.traceRequestData].includes(action.type) ||
        ([EActionTypes.fetchPrices, EActionTypes.savePrices, EActionTypes.requestSuccess].includes(action.type) &&
          !!(state as any).data.prices)
      ),
  })(applyMiddleware(sagaMiddleware)),
);

Object.keys(sagaMiddlewareRunners).forEach((runner: any) => {
  sagaMiddleware.run((sagaMiddlewareRunners as any)[runner]);
});

if (_ssrState) {
  const _ssr = _ssrState as IStore['ssr'];
  const _batch: IAction<{ [k: string]: any }>[] = [];

  _ssr?.rawData.forEach((item) => {
    const { response } = item.data;
    if(!response) return;
    switch (item.url) {
      case 'xwayz':
        {
          _batch.push(Action.ac_saveGeoIpData(response));
          _batch.push(Action.ac_saveClientSettings(new Model.MClientSettings(response)));
        }
        break;
      case 'getProfile':
        {
          _batch.push(Action.ac_saveProfile(new Model.MClientProfile(response.message)));
          _batch.push(Action.ac_saveClientSettings(new Model.MClientSettings(response.message)));
        }
        break;
      case 'settings':
        {
          _batch.push(Action.ac_saveClientSettings(new Model.MClientSettings(response.message)));
        }
        break;
      case 'login':
        {
          _batch.push(Action.ac_saveProfile(new Model.MClientProfile(response.profile)));
          _batch.push(Action.ac_saveClientSettings(new Model.MClientSettings(response.profile)));
        }
        break;
      case 'getHistory':
        {
          const payload = response.message.map((el: any) => new Model.MWithdrawalHistoryItem(el));
          _batch.push(Action.ac_saveWithdrawHistory(payload));
        }
        break;
      case 'getClientData':
        {
          _batch.push(Action.ac_saveClientData(new Model.MClientStatus(response)));
          _batch.push(Action.ac_saveDocuments(new Model.MDocuments(response.document_status)));
          _batch.push(Action.ac_saveTins(new Model.MTins(response.tins_data)));
          _batch.push(Action.ac_saveEdd(new Model.MEdd(response.edd_data)));
        }
        break;
      case 'getTradingAccounts':
        {
          _batch.push(Action.ac_saveTradingAccounts(new Model.MClientTradingData(response)));
        }
        break;
      case 'bankingStatements':
        {
          _batch.push(Action.ac_saveTransactionalStatements(new Model.MTransactionalStatementData(response.data)));
        }
        break;
    }
  });

  batch(() => _batch.forEach((action) => store.dispatch(action)));
}

export * from './actions';
export * from './sagas';
export * from './store.enum';
export * from './store.interface';
export * from './_app.reducer';
export * from './_data.reducer';
