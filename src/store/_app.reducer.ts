import { EActionTypes } from './store.enum';
import { IAction, IAppStore } from './store.interface';
import { Nullable } from '@domain/interfaces';

export const initAppStore: Nullable<IAppStore> = {
  route: {
    path: '/',
    locale: 'en',
    appSection: null,
    meta: {
      title: null,
      desc: null,
    },
  },
  requests: {
    activeList: [],
    failedList: [],
  },
  notification: {
    visible: false,
    type: null,
    timeout: null,
    context: null,
  },
  registration: {
    userExists: null,
    clientAdded: null,
  },
};

export function appStoreReducer(state = initAppStore as IAppStore, action: IAction) {
  switch (action.type) {
    case EActionTypes.fetchClientData:
    case EActionTypes.fetchContent:
    case EActionTypes.fetchGeoIpData:
    case EActionTypes.fetchProfile:
    case EActionTypes.fetchTradingAccounts:
    case EActionTypes.fetchWithdrawHistory:
    case EActionTypes.fetchWithdrawLimit:
      return {
        ...state,
        requests: {
          ...state.requests,
          activeList: [...(state.requests?.activeList || []), action.type],
        },
      };

    case EActionTypes.requestSuccess:
      return {
        ...state,
        requests: {
          activeList: (state.requests?.activeList || []).filter(
            (rc: string) => rc != action.payload?.requestActionType,
          ),
          failedList: (state.requests?.failedList || []).filter(
            (rc: string) => rc != action.payload?.requestActionType,
          ),
        },
      };

    case EActionTypes.requestFailure:
      return {
        ...state,
        requests: {
          activeList: (state.requests?.activeList || []).filter((rc) => rc != action.payload?.requestActionType),
          failedList: Object.assign(state.requests?.failedList, [action.payload?.requestActionType]),
        },
      };

    case EActionTypes.updateRoute:
      return { ...state, route: { ...state.route, ...action.payload } };

    case EActionTypes.saveUserExists:
    case EActionTypes.saveClientAdd:
      return { ...state, registration: { ...state.registration, ...action.payload } };

    case EActionTypes.showNotification:
      return { ...state, notification: { ...action.payload, visible: true } };

    case EActionTypes.hideNotification:
      return { ...state, notification: { ...initAppStore.notification, visible: false } };

    default:
      return state;
  }
}
