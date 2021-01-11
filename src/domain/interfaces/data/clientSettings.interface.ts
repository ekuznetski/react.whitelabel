import { IBaseResponse } from '../general.interface';
import { EAccountLeverage, ETradingAccountType, ETradingPlatform, ETradingPlatformName } from '@domain/enums';

export interface IClientSettingsRequest {
  username?: string;
  force?: boolean | null;
}

export interface IClientSettings {
  allow_additional_account: boolean;
  allow_additional_live_account: boolean;
  allow_additional_demo_account: boolean;
  allow_deposit: boolean;
  allow_withdrawal: boolean;
  allowed_currencies: string[];
  allowed_leverages: number[];
  allowed_account_types: string[];
  allowed_platforms: string[];
  jurisdiction: string;
  allow_internal_transfer: boolean;
  enable_citioptions: boolean;
  show_praxis_and_webmoney: boolean;
  phone_verification: string;
  show_promotions: boolean;
  show_compliance_popup: boolean;
  switch_cayman: boolean;
  go_to_praxis: boolean;
  edit_fake_account: boolean;
  trading_central: boolean;
}

export type IClientSettingsResponse = {
  response: {
    message: IClientSettings;
  };
} & IBaseResponse;

export interface IPlatformsSelectList {
  label: ETradingPlatformName;
  value: ETradingPlatform;
}
export interface ITradingAccountTypesSelectList {
  label: ETradingAccountType;
  value: ETradingAccountType;
}
export interface ILeveragesSelectList {
  label: EAccountLeverage;
  value: string;
}
