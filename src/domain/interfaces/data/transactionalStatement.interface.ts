import { IBaseResponse } from '../general.interface';

export type ITransactionalStatementsResponse = {
  response: {
    data: ITransactionalStatements;
  };
} & IBaseResponse;

export interface ITransactionalStatements {
  trades: ITransactionalSingleStatement[];
  deposits: ITransactionalSingleStatement[];
  withdrawals: ITransactionalSingleStatement[];
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
  from: string;
  to: string;
  deposits?: boolean;
  trades?: boolean;
  withdrawal?: boolean;
}
