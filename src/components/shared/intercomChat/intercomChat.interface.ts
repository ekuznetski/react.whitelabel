import { Country, ECurrencyCode, ETradingAccountType } from '@domain/enums';

export interface IIntercomChatParams {
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
    approved: string;
    userId: string;
  };
}
