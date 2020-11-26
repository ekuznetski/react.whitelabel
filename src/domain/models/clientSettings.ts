import {
  CCountryStateCode,
  CCountryStateName,
  countries,
  Country,
  EAccountLeverage,
  ECurrencyCode,
  ETradingAccountType,
  ETradingPlatform,
} from '@domain/enums';
import { IClientProfile, IClientSettings } from '@domain/interfaces';
import moment, { Moment } from 'moment';

export class MClientSettings {
  allow_additional_account: boolean;
  allow_additional_live_account: boolean;
  allow_additional_demo_account: boolean;
  allow_deposit: boolean;
  allowed_currencies: ECurrencyCode[];
  allowed_leverages: EAccountLeverage[];
  allowed_account_types: ETradingAccountType[];
  allowed_platforms: ETradingPlatform[];
  allow_internal_transfer: boolean;
  enable_citioptions: boolean;
  show_praxis_and_webmoney: boolean;
  constructor(props: IClientSettings) {
    this.allow_additional_account = props.allow_additional_account;
    this.allow_additional_live_account = props.allow_additional_live_account;
    this.allow_additional_demo_account = props.allow_additional_demo_account;
    this.allow_deposit = props.allow_deposit;
    this.allowed_currencies = Array.from(
      props.allowed_currencies.map((item) => ECurrencyCode[item.toLowerCase() as keyof typeof ECurrencyCode]),
    );
    this.allowed_leverages = Array.from(
      props.allowed_leverages.map((item) => EAccountLeverage[('1_' + item) as keyof typeof EAccountLeverage]),
    );
    this.allowed_account_types = Array.from(
      props.allowed_account_types.map(
        (item) => ETradingAccountType[item.toLowerCase() as keyof typeof ETradingAccountType],
      ),
    );
    this.allowed_platforms = Array.from(
      props.allowed_platforms.map((item) => ETradingPlatform[item.toLowerCase() as keyof typeof ETradingPlatform]),
    );
    this.allow_internal_transfer = props.allow_internal_transfer;
    this.show_praxis_and_webmoney = props.show_praxis_and_webmoney;
    this.enable_citioptions = props.enable_citioptions;
  }
}
