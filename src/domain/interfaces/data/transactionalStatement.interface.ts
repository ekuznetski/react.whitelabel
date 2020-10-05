import { IBaseResponse } from '../general.interface';

export type ITransactionalStatementsResponse = {
  response: ITransactionalStatements;
} & IBaseResponse;

export interface ITransactionalStatements {
  data: {
    trades: ITransactionalSingleStatement[];
    deposits: ITransactionalSingleStatement[];
    withdrawals: ITransactionalSingleStatement[];
  };
}

export interface ITransactionalSingleStatement {
  amount: string;
  currency: string;
  date_created: string;
  invoice_no: string;
  trade_account: string;
  trade_platform: string;
}

export interface ITransactionalStatementsRequestData {
  endDate: string;
  startDate: string;
  deposits?: boolean;
  trades?: boolean;
  withdrawal?: boolean;
}
