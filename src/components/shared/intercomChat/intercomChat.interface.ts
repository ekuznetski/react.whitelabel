import { Country, ECurrencyCode, ETradingAccountType } from '@domain/enums';

export type IIntercomChatParams = IIntercomParams;

interface IIntercomParams {
  userInfo?: {
    email: string;
    name: string;
    phone: string;
    country: Country;
    currency: ECurrencyCode;
    accountType: ETradingAccountType;
    manager: string;
    userHash: string;
    salesforce: string;
    deposit: string;
    jurisdiction: string;
    approved: string;
    userId: string;
  };
}
