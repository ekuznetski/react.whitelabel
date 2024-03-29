import { IBaseResponse } from '..';

export interface IWithdrawalHistory {
  reference: string;
  account: string;
  currency: string;
  amount: number;
  date: string;
  status_code: number;
  cancelable: boolean;
  subtotal: number;
  details?: {
    settlement_date: string;
    reference: string;
    method: string;
    amount: number;
  }[];
}

export type IWithdrawalHistoryResponse = IBaseResponse & {
  response: {
    message: IWithdrawalHistory[];
  };
};

export interface IWithdrawalCancel {
  account: string;
  amount: string;
  cancelable: number;
  currency: string;
  reference: string;
}

export type IWithdrawalCancelResponse = IBaseResponse & {
  response: {
    message: IWithdrawalCancel[];
  };
};

export type IWithdrawalLimitResponse = IBaseResponse & {
  response: {
    data: number;
  };
};

export interface IWithdrawFundRequest {
  trade_account: string;
  trade_platform: string;
  amount: number;
}
