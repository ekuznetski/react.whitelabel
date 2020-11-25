import { Country } from '@domain/enums';
import { MClientProfile } from '@domain/models';

export type IIntercomChatParams = IIntercomParams &
  IIntercomAppId &
  IIntercomZhAppId &
  IDealingDeskParams &
  MClientProfile;

interface IIntercomParams {
  email: string;
  first_name: string;
  last_name: string;
  country: string | Country;
  phone_prefix: string;
  phone: number;
  curr: string;
  account_type: string | any;
  manager: string;
  ic_hash: string;
  sfid: string;
  ftd: boolean;
  jurisdiction: string | any;
  aprv: boolean;
  url?: string;
}

interface IDealingDeskParams {
  requestAction?: string;
  clientRequest?: string;
}

interface IIntercomAppId {
  intercom_appid?: string;
}

interface IIntercomZhAppId {
  zhhans_appid?: string;
}

export enum IntercomChatAppId {
  default = 'p31288aj',
  arofx = 'p31288aj',
  bsfx = 'p31288aj',
}
