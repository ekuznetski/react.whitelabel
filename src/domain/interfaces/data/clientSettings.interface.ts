import { IBaseResponse } from '../general.interface';

export interface IClientSettingsRequest {
  username: string;
}

export interface IClientSettings {
  allow_additional_account: boolean;
  allow_additional_live_account: boolean;
  allow_additional_demo_account: boolean;
  allow_deposit: boolean;
  allowed_currencies: string[];
  allowed_leverages: number[];
  allowed_account_types: string[];
  allowed_platforms: string[];
  jurisdiction: string;
  allow_internal_transfer: boolean;
  enable_citioptions: boolean;
  show_praxis_and_webmoney: boolean;
}

export type IClientSettingsResponse = {
  response: {
    message: IClientSettings;
  };
} & IBaseResponse;
