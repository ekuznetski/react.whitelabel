import { IBaseResponse } from '../general.interface';

export type ITradingAccountsResponse = {
  response: ITradingAccounts;
} & IBaseResponse;

export interface ITradingAccounts {
  message: ITradingAccount[];
  totalBalance: number;
  balances: any;
  totalDemoBalance: number;
  balancesDemo: any;
  messageCode: number;
  promotions: {
    name: string;
    type: string;
    value: number;
  }[];
}

export interface ITradingAccount {
  AccountId: string;
  AccountType: string;
  AllowLeverageChange: boolean;
  Balance: number;
  Currency: string;
  Group: string;
  Leverage: string;
  Min_withdrawal: number;
  Platform: string;
  Type: string;
}

export interface ITradingAccount {
  AccountId: string;
  AccountType: string;
  AllowLeverageChange: boolean;
  Balance: number;
  Currency: string;
  Group: string;
  Leverage: string;
  Min_withdrawal: number;
  Platform: string;
  Type: string;
}

export interface IInternalTransferRequestData {
  fromAccount: number;
  fromPlatform: string;
  toAccount: number;
  toPlatform: string;
  amount: number;
}