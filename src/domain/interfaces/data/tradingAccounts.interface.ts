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
  AccountId: string | null;
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

export interface ICreateTradingAccountRequest {
  platform: string;
  account_type: string;
  currency: string;
  leverage: string;
}

export interface ICreateTradingAccountResponse {
  trade_account_id: string;
  Currency: string;
  pwd: string;
  platform: string;
}

export interface IChangeAccountLeverageRequest {
  trade_account: string;
  leverage: string;
  trade_platform: string;
}

export interface IChangeAccountPasswordRequest {
  account: string;
  password: string;
}

export interface IChangeAccountSettingsRequest {
  leverage: string;
  currency: string;
  account_type: string;
  firstdeposit_platform: string;
}

export type IChangeAccountSettingsResponse = {
  response: any;
} & IBaseResponse;

export type IChangeAccountLeverageResponse = {
  response: any;
} & IBaseResponse;

export type IChangeAccountPasswordResponse = {
  response: any;
} & IBaseResponse;
