import React, { useReducer } from 'react';
import { Nullable } from '@domain/interfaces';
import { Country, EDepositMethodCode, ETradingType, StaticAmounts } from '@domain/enums';
import { IStore } from '@store';
import { MClientProfile, MTradingAccount } from '@domain/models';
import { useSelector } from 'react-redux';

export type IDepositState = Nullable<{
  amount: string;
  account: MTradingAccount;
  staticAmounts: number[];
  method: EDepositMethodCode;
  isAmountSelected: boolean;
  depositDetails: any;
  billingDetails: {
    country: Country;
    state_code: string | null;
    city: string;
    address: string;
    postcode: string;
  };
}>;

export enum EDepositActionTypes {
  setMethod = 'setMethod',
  setAmount = 'setAmount',
  setBillingDetails = 'setBillingDetails',
  setAccount = 'setAccount',
  setIsAmountSelected = 'setIsAmountSelected',
  setDepositDetails = 'setDepositDetails',
}

export interface IDepositAction {
  type: EDepositActionTypes;
  payload: string | EDepositMethodCode | boolean;
}

export const depositActionCreators = {
  setMethod: (payload: EDepositMethodCode) => ({
    type: EDepositActionTypes.setMethod,
    payload,
  }),
  setAccount: (payload: MTradingAccount) => {
    console.log('payload', payload.accountId);
    return {
      type: EDepositActionTypes.setAccount,
      payload,
    };
  },
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
  setBillingDetails: (payload: { [key: string]: any }) => ({
    type: EDepositActionTypes.setBillingDetails,
    payload,
  }),
};

export const depositStateInit = {
  // TODO remove back isAmountSelected to false
  amount: null,
  account: null,
  staticAmounts: [],
  method: EDepositMethodCode.creditCard,
  isAmountSelected: false,
  depositDetails: null,
  billingDetails: null,
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
    case EDepositActionTypes.setBillingDetails:
      return { ...state, billingDetails: payload };
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

export function DepositProvider({ children }: React.PropsWithChildren<any>) {
  const { tradingAccounts, profile } = useSelector<
    IStore,
    { tradingAccounts: MTradingAccount[]; profile: MClientProfile }
  >((state) => ({
    tradingAccounts: state.data.tradingData.accounts.filter((acc) => acc.type !== ETradingType.demo),
    profile: state.data.client.profile,
  }));
  const billingDetails = {
    country: profile.country,
    state_code: (profile?.state.code as string) ?? null,
    city: profile.city,
    address: profile.street,
    postcode: profile.postcode,
  };
  const _staticAmounts = StaticAmounts[tradingAccounts[0].currency];
  const _depositStateInit = {
    ...depositStateInit,
    amount: _staticAmounts[0].toString(),
    staticAmounts: _staticAmounts,
    account: tradingAccounts[0],
    billingDetails: billingDetails,
  };
  const [state, dispatch] = useReducer(reducer, _depositStateInit);

  return <DepositContext.Provider value={{ state, dispatch }}>{children(state, dispatch)}</DepositContext.Provider>;
}

export function useDepositState() {
  const context = React.useContext(DepositContext);
  if (context === undefined) {
    throw new Error('useDepositState must be used within a DepositProvider');
  }
  return context.state;
}

export function useDepositDispatch(): any {
  const context = React.useContext(DepositContext);
  if (context === undefined) {
    throw new Error('useDepositDispatch must be used within a DepositProvider');
  }
  return context.dispatch;
}
