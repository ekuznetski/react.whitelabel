import { EActionTypes } from './store.enum';
import { IAction, IDataStore } from './store.interface';
import { Nullable } from '@domain/interfaces';

export const initDataStore: Nullable<IDataStore> = {
  content: null,
  geoIp: null,
  client: {
    // @ts-ignore
    profile: {
      first_name: 'Bob',
      surname: 'Doe',
      email: 'bobD@example.com',
    },
    statusData: null,
    preferences: {
      show_promotions: true,
      phone_verification: 'pending',
      show_compliance_popup: false,
      switch_cayman: false,
    },
    statements: null,
  },
  tradingData: null,
  withdrawals: {
    history: [],
    limit: null,
  },
};

export function dataStoreReducer(state = initDataStore as IDataStore, action: IAction) {
  switch (action.type) {
    case EActionTypes.saveContent:
      return { ...state, content: { ...state.content, ...action.payload } };

    case EActionTypes.saveProfile:
      return { ...state, client: { ...state.client, profile: action.payload } };

    case EActionTypes.saveClientData:
      return { ...state, client: { ...state.client, statusData: action.payload } };

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
