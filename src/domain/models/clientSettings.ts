import {
  Currencies,
  EAccountLeverage,
  EClientStatus,
  ECurrencyCode,
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
import { store } from '@store';
import { generateStatus } from '@utils/fn/generateStatus';

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
  show_promotions: boolean;
  phone_verification: TClientStatus;
  show_compliance_popup: boolean;
  switch_cayman: boolean;
  is_withdrawal_allowed: boolean;
  go_to_praxis: boolean;
  edit_fake_account: boolean;
  trading_central: boolean;

  constructor(props: IClientSettings | IClientProfile) {
    if (store) {
      const storeSettings = store?.getState().data.client.settings || {};
      props = { ...storeSettings, ...props };
    }

    this.allow_additional_account = props.allow_additional_account;
    this.allow_additional_live_account = props.allow_additional_live_account;
    this.allow_additional_demo_account = props.allow_additional_demo_account;
    this.allow_deposit = props.allow_deposit;

    this.allowed_currencies = Array.from(
      (props.allowed_currencies || []).map((item) => ECurrencyCode[item.toLowerCase() as keyof typeof ECurrencyCode]),
    );

    this.allowed_leverages = Array.from(
      (props.allowed_leverages || []).map(
        (item) => EAccountLeverage[item.toString().replace(/(1[_:])?(.*)/, '1_$2') as keyof typeof EAccountLeverage],
      ),
    );

    this.allowed_account_types = Array.from(
      (props.allowed_account_types || []).map(
        (item) => ETradingAccountType[item?.toLowerCase() as keyof typeof ETradingAccountType],
      ),
    );

    this.allowed_platforms = Array.from(
      (props.allowed_platforms || []).map((item) => {
        return ETradingPlatform[item.toLowerCase() as keyof typeof ETradingPlatform];
      }),
    );

    this.allow_internal_transfer = props.allow_internal_transfer;
    this.show_praxis_and_webmoney = props.show_praxis_and_webmoney;
    this.enable_citioptions = props.enable_citioptions;
    this.show_promotions = props.show_promotions || true;
    this.phone_verification = generateStatus(props.phone_verification?.toLowerCase?.() as keyof typeof EClientStatus);
    this.show_compliance_popup = props.show_compliance_popup || false;
    this.switch_cayman = props.switch_cayman || false;
    this.is_withdrawal_allowed = props.is_withdrawal_allowed || false;
    this.go_to_praxis = props.go_to_praxis || false;
    this.edit_fake_account = props.edit_fake_account || false;
    this.trading_central = props.trading_central || false;
  }

  getCurrenciesSelectList = (): typeof Currencies => {
    return this.allowed_currencies.reduce((acc: typeof Currencies, el) => {
      const key = el.toLowerCase();
      return Object.assign(acc, { [key]: Currencies[key] });
    }, {});
  };

  getTradingAccountTypesSelectList = (): ITradingAccountTypesSelectList[] => {
    return this.allowed_account_types.map((el) => ({
      label: el,
      value: el,
    }));
  };

  getLeveragesSelectList = (): ILeveragesSelectList[] => {
    return this.allowed_leverages.map((el) => ({
      label: el,
      value: el,
    }));
  };

  getPlatformsSelectList = (): IPlatformsSelectList[] => {
    return this.allowed_platforms.map((el) => ({
      label: ETradingPlatformName[el],
      value: el,
    }));
  };
}
