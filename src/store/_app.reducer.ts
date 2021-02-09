import { IAction, IAppStore } from './store.interface';
import { ELanguage, EPagePath } from '@domain/enums';
import { Nullable } from '@domain/interfaces';
import { EActionTypes } from './store.enum';

export const initAppStore: Nullable<IAppStore> = {
  route: {
    path: EPagePath.Home,
    locale: ELanguage.en,
    appSection: null,
    meta: {
      title: null,
      desc: null,
    },
    state: null,
    isLoading: true,
    redirectTo: null,
  },
  requests: {
    activeList: [],
    failedList: [],
  },
  notification: {
    visible: false,
    type: null,
    timeout: null,
    message: null,
  },
  modal: {
    visible: false,
    component: null,
  },
};

export function ignoreActionIfPageLoadedList() {
  return window.isSSR ? [] : [EActionTypes.fetchPrices, EActionTypes.fetchClientData, EActionTypes.uploadDocuments];
}

export function appStoreReducer(state = initAppStore as IAppStore, action: IAction) {
  switch (action.type) {
    case EActionTypes.fetchClientData:
    case EActionTypes.fetchPrices:
    case EActionTypes.fetchContent:
    case EActionTypes.fetchGeoIpData:
    case EActionTypes.fetchProfile:
    case EActionTypes.fetchTradingAccounts:
    case EActionTypes.fetchWithdrawHistory:
    case EActionTypes.fetchWithdrawLimit:
    case EActionTypes.fetchBankDetails:
    case EActionTypes.uploadDocuments:
    case EActionTypes.editProfile:
    case EActionTypes.changePassword:
    case EActionTypes.updateBankDetails:
    case EActionTypes.withdrawFunds:
    case EActionTypes.createLiveTradingAccount:
    case EActionTypes.createDemoTradingAccount:
    case EActionTypes.submitEdd:
    case EActionTypes.login:
    case EActionTypes.logout:
    case EActionTypes.makeInternalTransfer:
    case EActionTypes.changeAccountSettings:
    case EActionTypes.changeAccountLeverage:
    case EActionTypes.changeAccountPassword:
      const ignoreActionIfPageLoaded = !state.route.isLoading
        ? !ignoreActionIfPageLoadedList().includes(action.type)
        : true;
      return {
        ...state,
        requests: {
          ...state.requests,
          activeList: Array.from(new Set([...(state.requests?.activeList ?? []), action.type])),
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
      const _route = { ...state.route, ...action.payload };
      return {
        ...state,
        route: _route,
        ...(_route.path !== state.route.path
          ? {
              notification: { ...initAppStore.notification, type: state.notification.type },
              modal: { component: null, visible: false },
            }
          : {}),
      };

    case EActionTypes.showNotification:
      return { ...state, notification: { ...action.payload, visible: true } };

    case EActionTypes.hideNotification:
      return { ...state, notification: { ...initAppStore.notification, type: state.notification.type } };

    case EActionTypes.showModal:
      return { ...state, modal: { ...action.payload, visible: true } };
    case EActionTypes.hideModal:
      return { ...state, modal: { component: null, visible: false } };
    default:
      return state;
  }
}
