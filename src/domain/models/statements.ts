import { ECurrencyCode, ETradingPlatform } from '@domain/enums';
import { ITransactionalSingleStatement, ITransactionalStatements } from '@domain/interfaces';
import moment, { Moment } from 'moment';

export class MTransactionalStatement {
  amount: number;
  currency: ECurrencyCode;
  date_created: Moment;
  invoice_no: string;
  trade_account: number;
  trade_platform: ETradingPlatform;
  trade_platformName: string;

  constructor(props: ITransactionalSingleStatement) {
    this.trade_account = parseInt(props.trade_account);
    this.amount = parseInt(props.amount);
    this.invoice_no = props.invoice_no;

    this.currency = ECurrencyCode[props.currency.toLowerCase() as keyof typeof ECurrencyCode] || ECurrencyCode.usd;
    this.date_created = moment(props.date_created);
    this.trade_platform =
      ETradingPlatform[props.trade_platform.toLowerCase() as keyof typeof ETradingPlatform] || ETradingPlatform.mt4;
    this.trade_platformName =
      this.trade_platform === ETradingPlatform.mt4 ? ETradingPlatform.mt4 : ETradingPlatform.mt5;
  }
}

export class MTransactionalStatementData {
  trades: MTransactionalStatement[];
  deposits: MTransactionalStatement[];
  withdrawals: MTransactionalStatement[];

  constructor(props: ITransactionalStatements) {
    this.trades = props.trades?.map((item) => new MTransactionalStatement(item)) || [];
    this.deposits = props.deposits?.map((item) => new MTransactionalStatement(item)) || [];
    this.withdrawals = props.withdrawals?.map((item) => new MTransactionalStatement(item)) || [];
  }
}
