import { Nullable } from '@domain/interfaces';
import { EActionTypes } from './store.enum';
import { IAction, ISSRStore } from './store.interface';

export const initSSRStore: Nullable<ISSRStore> = {
  rawData: [],
};

export function ssrStoreReducer(state = initSSRStore, action: IAction) {
  switch (action.type) {
    case EActionTypes.traceRequestData:
      if (!action.payload) return state;
      const exist = (state.rawData || []).map((item) => item?.url).includes(action.payload.url);
      return { ...state, rawData: [...(state.rawData || []), ...(exist ? [] : [action.payload])] };
    default:
      return state;
  }
}
