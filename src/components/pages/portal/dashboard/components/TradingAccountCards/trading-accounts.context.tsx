import React from 'react';
import { ISingleCard } from '@components/shared';
import { ITradingAccountSingleCard } from '@pages/portal/dashboard/components/TradingAccountCards/SingleCard/TradingAccountSingleCard';

export enum ETradingAccContextActionTypes {
  setCardUnderDropdown = 'setCardUnderDropdown',
}

interface IAction {
  type: ETradingAccContextActionTypes;
  payload: any;
}

type IDispatch = (action: IAction) => void;
type State = {
  CardUnderDropdown: ITradingAccountSingleCard | null;
};

type TradingAccountsProviderProps = { children: (state: State, action: React.Dispatch<IAction>) => React.ReactNode };

const TradingAccountsStateContext = React.createContext<State | undefined>(undefined);
const TradingAccountsDispatchContext = React.createContext<IDispatch | undefined>(undefined);

function tradingAccountsReducer(state: State, action: IAction) {
  switch (action.type) {
    case ETradingAccContextActionTypes.setCardUnderDropdown: {
      return { ...state, CardUnderDropdown: action.payload };
    }
    default: {
      throw new Error(`Unhandled TradingAccounts action type: ${action.type}`);
    }
  }
}

function TradingAccountsProvider({ children }: TradingAccountsProviderProps) {
  const [state, dispatch] = React.useReducer<React.Reducer<State, IAction>>(tradingAccountsReducer, {
    CardUnderDropdown: null,
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
