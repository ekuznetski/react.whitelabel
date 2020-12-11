import { IBaseResponse } from '../general.interface';
import { IClientSettings } from './clientSettings.interface';

export type IClientProfile = {
  email: string;
  username: string;
  first_name: string;
  surname: string;
  country: string;
  state: string | null;
  street: string;
  city: string;
  postcode: string;
  phone_prefix: string;
  phone: string;
  dob: string;
  account_type: string;
  affiliate_code: string | null;
  raf_id: string | null;
  nationality: string;
  dual_nationality: string;
  ic_hash: string;
  jurisdiction: string;
  userId: string;
  sfid: string;
  ftd: boolean;
  trading_central: boolean;
  aprv: boolean;
  curr: string;
  brand: string;
  manager: string;
  regDate: string;
  go_to_praxis: boolean;
  is_withdrawal_allowed: boolean;
  edit_fake_account: boolean;
} & IClientSettings;

export type IClientProfileResponse = {
  response: {
    message: IClientProfile;
  };
} & IBaseResponse;
