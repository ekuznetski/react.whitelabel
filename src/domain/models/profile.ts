import {
  CCountryStateCode,
  CCountryStateName,
  countries,
  Country,
  EAccountLeverage,
  ECountryCode,
  ECurrencyCode,
  ETradingAccountType,
  ETradingPlatform,
} from '@domain/enums';
import { IClientProfile } from '@domain/interfaces';
import moment, { Moment } from 'moment';

export class MClientProfile {
  // Client Data
  email: string;
  username: string;
  first_name: string;
  surname: string;
  country: Country | null;
  state: {
    name?: ThisType<typeof CCountryStateName[keyof typeof CCountryStateName]>;
    code?: ThisType<typeof CCountryStateCode[keyof typeof CCountryStateCode]>;
  } | null;
  street: string;
  city: string;
  postcode: string;
  phone_prefix_code: ECountryCode[keyof ECountryCode] | null;
  phone_prefix: string;
  phone: number;
  dob: Moment;
  nationality: Country | null;
  dual_nationality: Country | null;
  jurisdiction: string;
  curr: ECurrencyCode;

  // Client Account
  account_type: ETradingAccountType;
  trading_central: boolean;
  is_withdrawal_allowed: boolean;
  edit_fake_account: boolean;

  // Client Preferences
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

  // clint Meta
  affiliate_code: string | null;
  raf_id: string | null;
  ic_hash: string;
  userId: string;
  sfid: string;
  ftd: boolean;
  aprv: boolean;
  brand: string;
  manager: string;
  regDate: Moment;
  go_to_praxis: boolean;

  constructor(props: IClientProfile) {
    // Client Data
    this.email = props.email;
    this.username = props.username;
    this.first_name = props.first_name;
    this.surname = props.surname;
    this.country = countries.find((country) => country.name === props.country) || null;
    this.state =
      (props.state &&
        countries
          .filter((country) => country.states)
          .find((country) => country.states?.find((state) => state.name === props.state))) ||
      null;
    this.street = props.street;
    this.city = props.city;
    this.postcode = props.postcode;
    this.phone_prefix_code = countries.find((country) => country.phoneCode === props.phone_prefix)?.code || null;
    this.phone_prefix = props.phone_prefix;
    this.phone = parseInt(props.phone);
    this.dob = moment(props.dob);
    this.nationality = countries.find((country) => country.name === props.nationality) || null;
    this.dual_nationality = countries.find((country) => country.name === props.dual_nationality) || null;
    this.jurisdiction = props.jurisdiction;
    this.curr = ECurrencyCode[props.curr.toLowerCase() as keyof typeof ECurrencyCode] || ECurrencyCode.usd;

    // Client Account
    this.account_type =
      ETradingAccountType[props.account_type.toLowerCase() as keyof typeof ETradingAccountType] ||
      ETradingAccountType.fixed;
    this.trading_central = props.trading_central;
    this.is_withdrawal_allowed = props.is_withdrawal_allowed;
    this.edit_fake_account = props.edit_fake_account;

    // Client Preferences
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

    // clint Meta
    this.affiliate_code = props.affiliate_code;
    this.raf_id = props.raf_id;
    this.ic_hash = props.ic_hash;
    this.userId = props.userId;
    this.sfid = props.sfid;
    this.ftd = props.ftd;
    this.aprv = props.aprv;
    this.brand = props.brand;
    this.manager = props.manager;
    this.regDate = moment(props.regDate);
    this.go_to_praxis = props.go_to_praxis;
  }
}
