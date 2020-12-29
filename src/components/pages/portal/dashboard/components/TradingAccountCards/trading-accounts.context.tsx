import React from 'react';
import { ISingleCard } from '@components/shared';
import { ITradingAccountSingleCard } from '@pages/portal/dashboard/components/TradingAccountCards/SingleCard/TradingAccountSingleCard';

export enum ETradingAccContextActionTypes {
  setCardUnderDropdown = 'setCardUnderDropdown',
  setOpenAccountSettingsModal = 'setOpenAccountSettingsModal',
  setOpenAccountPasswordModal = 'setOpenAccountPasswordModal',
}

interface IAction {
  type: ETradingAccContextActionTypes;
  card?: any;
  modalState?: boolean;
}

type IDispatch = (action: IAction) => void;
type State = {
  cardUnderDropdown: ITradingAccountSingleCard | null;
  isOpenAccountSettingsModal: boolean;
  isOpenAccountPasswordModal: boolean;
};

type TradingAccountsProviderProps = { children: (state: State, action: React.Dispatch<IAction>) => React.ReactNode };

const TradingAccountsStateContext = React.createContext<State | undefined>(undefined);
const TradingAccountsDispatchContext = React.createContext<IDispatch | undefined>(undefined);

function tradingAccountsReducer(state: State, action: IAction) {
  switch (action.type) {
    case ETradingAccContextActionTypes.setCardUnderDropdown: {
      return { ...state, cardUnderDropdown: action.card || null };
    }
    case ETradingAccContextActionTypes.setOpenAccountSettingsModal: {
      return { ...state, isOpenAccountSettingsModal: action.modalState || false };
    }
    case ETradingAccContextActionTypes.setOpenAccountPasswordModal: {
      return { ...state, isOpenAccountPasswordModal: action.modalState || false };
    }
    default: {
      throw new Error(`Unhandled TradingAccounts action type: ${action.type}`);
    }
  }
}

function TradingAccountsProvider({ children }: TradingAccountsProviderProps) {
  const [state, dispatch] = React.useReducer<React.Reducer<State, IAction>>(tradingAccountsReducer, {
    cardUnderDropdown: null,
    isOpenAccountSettingsModal: false,
    isOpenAccountPasswordModal: false,
  });

  return (
    <TradingAccountsStateContext.Provider value={state}>
      <TradingAccountsDispatchContext.Provider value={dispatch}>
        {children(state, dispatch)}
      </TradingAccountsDispatchContext.Provider>
    </TradingAccountsStateContext.Provider>
  );
}

function useTradingAccountsState() {
  const context = React.useContext(TradingAccountsStateContext);
  if (context === undefined) {
    throw new Error('useTradingAccountsState must be used within a TradingAccountsProvider');
  }
  return context;
}

function useTradingAccountsDispatch() {
  const context = React.useContext(TradingAccountsDispatchContext);
  if (context === undefined) {
    throw new Error('useTradingAccountsDispatch must be used within a TradingAccountsProvider');
  }
  return context;
}

export { TradingAccountsProvider, useTradingAccountsState, useTradingAccountsDispatch };
