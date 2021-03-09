import { initialClientSettings } from '@domain';
import { Nullable } from '@domain/interfaces';
import { EActionTypes } from './store.enum';
import { IAction, IDataStore } from './store.interface';

export const initDataStore: Nullable<IDataStore> = {
  content: null,
  geoIp: null,
  client: {
    profile: null,
    status: null,
    settings: initialClientSettings,
    statements: null,
    documents: null,
    tins: null,
    edd: null,
  },
  tradingData: null,
  withdrawals: {
    history: [],
    limit: null,
  },
  bankDetails: null,
  prices: null,
};

export function dataStoreReducer(state = initDataStore as IDataStore, action: IAction) {
  switch (action.type) {
    case EActionTypes.clearStore:
      return initDataStore;

    case EActionTypes.saveBankDetails:
      return { ...state, bankDetails: { ...state.content, ...action.payload } };

    case EActionTypes.saveContent:
      return { ...state, content: { ...state.content, ...action.payload } };

    case EActionTypes.saveProfile:
      return { ...state, client: { ...state.client, profile: action.payload } };

    case EActionTypes.saveClientSettings:
      const _stateSettings = state.client.settings;
      const _payload = action.payload
        ? Object.keys(action.payload).reduce(
            (acc, key) =>
              Object.assign(
                acc,
                action.payload?.[key] !== null && action.payload?.[key] !== undefined
                  ? { [key]: action.payload[key] }
                  : {},
              ),
            {},
          )
        : {};

      return { ...state, client: { ...state.client, settings: Object.assign({}, _stateSettings, _payload) } };

    case EActionTypes.saveClientData:
      return { ...state, client: { ...state.client, status: action.payload } };

    case EActionTypes.saveTransactionalStatements:
      return { ...state, client: { ...state.client, statements: action.payload } };

    case EActionTypes.clearTransactionalStatements:
      return { ...state, client: { ...state.client, statements: null } };

    case EActionTypes.saveDocuments:
      return { ...state, client: { ...state.client, documents: action.payload } };

    case EActionTypes.saveTins:
      return { ...state, client: { ...state.client, tins: action.payload } };

    case EActionTypes.saveEdd:
      return { ...state, client: { ...state.client, edd: action.payload } };

    case EActionTypes.saveTradingAccounts:
      return { ...state, tradingData: action.payload };

    case EActionTypes.saveWithdrawHistory:
      return { ...state, withdrawals: { ...state.withdrawals, history: action.payload } };

    case EActionTypes.saveWithdrawLimit:
      return { ...state, withdrawals: { ...state.withdrawals, limit: action.payload?.limit } };

    case EActionTypes.saveGeoIpData:
      return { ...state, geoIp: action.payload };

    case EActionTypes.savePrices:
      return { ...state, prices: action.payload };

    default:
      return state;
  }
}
