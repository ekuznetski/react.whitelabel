import React, { useReducer } from 'react';
import { Nullable } from '@domain/interfaces';
import { EDepositMethods } from '@domain/enums';
import { IStore } from '@store';
import { MTradingAccount } from '@domain/models';
import { useSelector } from 'react-redux';

export const availableAmounts = ['100', '450', '900', '4500', '9000', '18000', '45000'];

export type IDepositState = Nullable<{
  amount: string;
  account: MTradingAccount;
  method: EDepositMethods;
  isAmountSelected: boolean;
  depositDetails: any;
}>;

export enum EDepositActionTypes {
  setMethod = 'setMethod',
  setAmount = 'setAmount',
  setAccount = 'setAccount',
  setIsAmountSelected = 'setIsAmountSelected',
  setDepositDetails = 'setDepositDetails',
}

export interface IDepositAction {
  type: EDepositActionTypes;
  payload: string | EDepositMethods | boolean;
}

export const depositActionCreators = {
  setMethod: (payload: EDepositMethods) => ({
    type: EDepositActionTypes.setMethod,
    payload,
  }),
  setAccount: (payload: MTradingAccount) => ({
    type: EDepositActionTypes.setAccount,
    payload,
  }),
  setAmount: (payload: string) => ({
    type: EDepositActionTypes.setAmount,
    payload,
  }),
  setIsAmountSelected: (payload: boolean) => ({
    type: EDepositActionTypes.setIsAmountSelected,
    payload,
  }),
  setDepositDetails: (payload: { [key: string]: string }) => ({
    type: EDepositActionTypes.setDepositDetails,
    payload,
  }),
};

export const depositStateInit = {
  // TODO remove back isAmountSelected to false
  amount: availableAmounts[0],
  account: null,
  method: EDepositMethods.creditCard,
  isAmountSelected: false,
  depositDetails: null,
};

function reducer(state: IDepositState, action: IDepositAction): IDepositState {
  const type = action.type;
  const payload: any = action.payload;
  switch (type) {
    case EDepositActionTypes.setAmount:
      return { ...state, amount: payload, isAmountSelected: true };
    case EDepositActionTypes.setAccount:
      return { ...state, account: payload };
    case EDepositActionTypes.setMethod:
      return { ...state, method: payload };
    case EDepositActionTypes.setIsAmountSelected:
      return { ...state, isAmountSelected: payload };
    case EDepositActionTypes.setDepositDetails:
      return { ...state, depositDetails: payload };
    default:
      return state;
  }
}

export const DepositContext = React.createContext<{
  state: IDepositState;
  dispatch: React.Dispatch<IDepositAction> | null;
}>({
  state: depositStateInit,
  dispatch: null,
});

export function DepositContextWrapper({ children }: React.PropsWithChildren<any>) {
  const { tradingAccounts } = useSelector<IStore, { tradingAccounts: MTradingAccount[] }>((state) => ({
    tradingAccounts: state.data.tradingData.accounts,
  }));
  const _depositStateInit = { ...depositStateInit, account: tradingAccounts[0] };
  const [state, dispatch] = useReducer(reducer, _depositStateInit);

  return <DepositContext.Provider value={{ state, dispatch }}>{children(state, dispatch)}</DepositContext.Provider>;
}
