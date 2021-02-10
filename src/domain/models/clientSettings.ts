import {
  Currencies,
  EAccountLeverage,
  EClientStatus,
  ECurrencyCode,
  EDepositMethodCode,
  ETradingAccountType,
  ETradingPlatform,
  ETradingPlatformName,
} from '@domain/enums';
import {
  IClientProfile,
  IClientSettings,
  ILeveragesSelectList,
  IPlatformsSelectList,
  ITradingAccountTypesSelectList,
  TClientStatus,
} from '@domain/interfaces';
import { generateStatus } from '@utils/fn/generateStatus';

export class MClientSettings {
  phone_verification?: TClientStatus;
  allowed_currencies?: ECurrencyCode[];
  allowed_leverages?: EAccountLeverage[];
  allowed_account_types?: ETradingAccountType[];
  allowed_deposit_methods?: EDepositMethodCode[];
  allowed_platforms?: ETradingPlatform[];
  allow_additional_account?: boolean;
  allow_additional_live_account?: boolean;
  allow_additional_demo_account?: boolean;
  allow_deposit?: boolean;
  allow_internal_transfer?: boolean;
  enable_citioptions?: boolean;
  show_praxis_and_webmoney?: boolean;
  show_promotions?: boolean;
  show_compliance_popup?: boolean;
  switch_cayman?: boolean;
  allow_withdrawal?: boolean;
  go_to_praxis?: boolean;
  edit_fake_account?: boolean;
  trading_central?: boolean;

  constructor(props: IClientSettings | IClientProfile, castType = false) {
    if (castType) return this;

    this.allow_additional_account = props.allow_additional_account;
    this.allow_additional_live_account = props.allow_additional_live_account;
    this.allow_additional_demo_account = props.allow_additional_demo_account;
    this.allow_deposit = props.allow_deposit;

    if (props.allowed_deposit_methods) {
      this.allowed_deposit_methods = props.allowed_deposit_methods.map((e: any) => {
        return e as EDepositMethodCode;
      });
    }

    if (props.allowed_currencies)
      this.allowed_currencies = props.allowed_currencies.map(
        (item) => ECurrencyCode[item.toLowerCase() as keyof typeof ECurrencyCode],
      );

    if (props.allowed_leverages)
      this.allowed_leverages = props.allowed_leverages.map(
        (item) => EAccountLeverage[item.toString().replace(/(1[_:])?(.*)/, '1_$2') as keyof typeof EAccountLeverage],
      );

    if (props.allowed_account_types)
      this.allowed_account_types = props.allowed_account_types.map(
        (item) => ETradingAccountType[item?.toLowerCase() as keyof typeof ETradingAccountType],
      );

    if (props.allowed_platforms)
      this.allowed_platforms = props.allowed_platforms.map((item) => {
        return ETradingPlatform[item.toLowerCase() as keyof typeof ETradingPlatform];
      });

    if (props.phone_verification)
      this.phone_verification = generateStatus(props.phone_verification?.toLowerCase?.() as keyof typeof EClientStatus);

    this.allow_internal_transfer = props.allow_internal_transfer;
    this.show_praxis_and_webmoney = props.show_praxis_and_webmoney;
    this.enable_citioptions = props.enable_citioptions;
    this.show_promotions = props.show_promotions;
    this.show_compliance_popup = props.show_compliance_popup;
    this.switch_cayman = props.switch_cayman;
    this.allow_withdrawal = props.allow_withdrawal;
    this.go_to_praxis = props.go_to_praxis;
    this.edit_fake_account = props.edit_fake_account;
    this.trading_central = props.trading_central;
  }

  getCurrenciesSelectList = (): typeof Currencies => {
    return (this.allowed_currencies || []).reduce((acc: typeof Currencies, el) => {
      const key = el.toLowerCase();
      return Object.assign(acc, { [key]: Currencies[key] });
    }, {});
  };

  getTradingAccountTypesSelectList = (): ITradingAccountTypesSelectList[] => {
    return (this.allowed_account_types || []).map((el) => ({
      label: el,
      value: el,
    }));
  };

  getLeveragesSelectList = (): ILeveragesSelectList[] => {
    return (this.allowed_leverages || []).map((el) => ({
      label: el,
      value: el,
    }));
  };

  getPlatformsSelectList = (): IPlatformsSelectList[] => {
    return (this.allowed_platforms || []).map((el) => ({
      label: ETradingPlatformName[el],
      value: el,
    }));
  };
}
