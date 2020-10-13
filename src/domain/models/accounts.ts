import {
  EAccountLeverage,
  ECurrency,
  ECurrencyCode,
  ECurrencySymbol,
  ETradingAccountType,
  ETradingPlatform,
  ETradingType,
} from '@domain/enums';
import { ITradingAccount, ITradingAccounts } from '@domain/interfaces';

export class MTradingAccount {
  accountId: number;
  accountType: ETradingAccountType;
  allowLeverageChange: boolean;
  balance: number;
  currency: ECurrencyCode;
  currencySymbol: ECurrencySymbol;
  group: string;
  leverage: EAccountLeverage;
  minWithdrawal: number;
  platform: ETradingPlatform;
  platformName: string;
  type: ETradingType;

  constructor(props: ITradingAccount) {
    this.accountId = parseInt(props.AccountId);
    this.allowLeverageChange = props.AllowLeverageChange;
    this.balance = props.Balance;
    this.minWithdrawal = props.Min_withdrawal;
    this.group = props.Group;

    this.accountType =
      ETradingAccountType[props.AccountType.toLowerCase() as keyof typeof ETradingAccountType] ||
      ETradingAccountType.fixed;
    this.currency = ECurrencyCode[props.Currency.toLowerCase() as keyof typeof ECurrencyCode] || ECurrencyCode.usd;
    this.currencySymbol = ECurrencySymbol[this.currency.toLowerCase() as ECurrency];
    this.leverage =
      EAccountLeverage[`1_${props.Leverage}` as keyof typeof EAccountLeverage] || EAccountLeverage['1_200'];
    this.platform =
      ETradingPlatform[props.Platform.toLowerCase() as keyof typeof ETradingPlatform] || ETradingPlatform.mt4;
    this.platformName = this.platform === ETradingPlatform.mt4 ? 'Mt4' : 'Mt5';
    this.type = ETradingType[props.Type.toLowerCase() as keyof typeof ETradingType] || ETradingType.demo;
  }
}

export class MClientTradingData {
  accounts: MTradingAccount[];

  constructor(props: ITradingAccounts) {
    this.accounts = props.message?.map((item) => new MTradingAccount(item)) || null;
  }
}
