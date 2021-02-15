import {
  CCountryStateCode,
  CCountryStateName,
  Country,
  ECurrencyCode,
  ETradingAccountType,
  countries,
} from '@domain/enums';
import { IClientProfile } from '@domain/interfaces';
import moment, { Moment } from 'moment';

export class MClientProfile {
  // Client Data
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  country: Country;
  state: {
    name: ThisType<typeof CCountryStateName[keyof typeof CCountryStateName]> | '';
    code: ThisType<typeof CCountryStateCode[keyof typeof CCountryStateCode]> | '';
  };
  street: string;
  city: string;
  postcode: string;
  phone_prefix_code: Country;
  phone_prefix: string;
  phone: number;
  newPhone: {
    country: Country;
    prefix: string;
    number: number;
  };
  dob: Moment;
  nationality: Country;
  dual_nationality: Country;
  jurisdiction: string;
  curr: ECurrencyCode;

  // Client Account
  account_type: ETradingAccountType;

  // Client Meta
  affiliate_code: string;
  raf_id: string;
  ic_hash: string;
  userId: string;
  sfid: string;
  ftd: boolean;
  aprv: boolean;
  brand: string;
  manager: string;
  regDate: Moment;

  constructor(props: IClientProfile) {
    // Client Data
    this.email = props.email;
    this.username = props.username;
    this.first_name = props.first_name;
    this.last_name = props.surname;
    this.country = countries.find((country) => country.name === props.country) || {
      name: undefined,
      code: undefined,
      phoneCode: '',
    };
    this.state = (
      props.state &&
      countries
        .filter((country) => country.states)
        .find((country) => country.states?.find((state) => state.code === props.state))
    )?.states //@ts-ignore
      ?.filter((state: any) => state.code === props.state) || {
      name: '',
      code: '',
    };
    this.street = props.street;
    this.city = props.city;
    this.postcode = props.postcode;
    this.phone_prefix_code = countries.find((country) => country.phoneCode === props.phone_prefix) || {
      name: undefined,
      code: undefined,
      phoneCode: '',
    };
    this.phone_prefix = props.phone_prefix;
    this.phone = parseInt(props.phone);
    this.newPhone = {
      country: countries.find((country) => country.phoneCode === props.phone_prefix) || {
        name: undefined,
        code: undefined,
        phoneCode: '',
      },
      prefix: props.phone_prefix,
      number: parseInt(props.phone),
    };
    this.dob = moment(props.dob);
    this.nationality = countries.find((country) => country.name === props.nationality) || {
      name: undefined,
      code: undefined,
      phoneCode: '',
    };
    this.dual_nationality = countries.find((country) => country.name === props.dual_nationality) || {
      name: undefined,
      code: undefined,
      phoneCode: '',
    };
    this.jurisdiction = props.jurisdiction;
    this.curr = ECurrencyCode[props.curr.toLowerCase() as keyof typeof ECurrencyCode] || ECurrencyCode.usd;

    // Client Account
    this.account_type =
      ETradingAccountType[props.account_type.toLowerCase() as keyof typeof ETradingAccountType] ||
      ETradingAccountType.fixed;

    // clint Meta
    this.affiliate_code = props.affiliate_code || '';
    this.raf_id = props.raf_id || '';
    this.ic_hash = props.ic_hash;
    this.userId = props.userId;
    this.sfid = props.sfid;
    this.ftd = props.ftd;
    this.aprv = props.aprv;
    this.brand = props.brand;
    this.manager = props.manager;
    this.regDate = moment(props.regDate);
  }
}
