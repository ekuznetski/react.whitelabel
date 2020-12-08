import { EActionTypes } from './store.enum';
import { IAction, IAppStore } from './store.interface';
import { Nullable } from '@domain/interfaces';
import { ELanguage } from '@domain/enums';

export const initAppStore: Nullable<IAppStore> = {
  route: {
    path: '/',
    locale: ELanguage.en,
    appSection: null,
    meta: {
      title: null,
      desc: null,
    },
    state: null,
    isLoading: true,
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
};

export function appStoreReducer(state = initAppStore as IAppStore, action: IAction) {
  switch (action.type) {
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
          ? { notification: { ...initAppStore.notification, type: state.notification.type } }
          : {}),
      };

    case EActionTypes.showNotification:
      return { ...state, notification: { ...action.payload, visible: true } };

    case EActionTypes.hideNotification:
      return { ...state, notification: { ...initAppStore.notification, type: state.notification.type } };

    default:
      return {
        ...state,
        requests: {
          ...state.requests,
          activeList: [...(state.requests?.activeList || []), action.type],
        },
      };
  }
}
