import { EActionTypes } from './store.enum';
import { IAction, IDataStore } from './store.interface';
import { Nullable } from '@domain/interfaces';
import { useLabelView } from '@utils/hooks';
import { ELabels } from '@domain/enums';

export const initDataStore: Nullable<IDataStore> = {
  content: null,
  geoIp: null,
  client: {
    profile: null,
    statusData: null,
    settings: useLabelView({
      '*': {
        allowed_account_types: ['fixed', 'classic', 'raw'],
      },
      [ELabels.bsfx]: {
        allowed_account_types: ['fixed', 'variable'],
      },
    }),
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
      // console.log(action, state.client.settings);
      return { ...state, client: { ...state.client, settings: { ...state.client.settings, ...action.payload } } };

    case EActionTypes.saveClientData:
      return { ...state, client: { ...state.client, statusData: action.payload } };

    case EActionTypes.saveTransactionalStatements:
      return { ...state, client: { ...state.client, statements: action.payload } };

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

    default:
      return state;
  }
}
