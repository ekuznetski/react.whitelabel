import { IBaseResponse } from '..';

export interface IBankDetails {
  beneficiary_name: string;
  beneficiary_bank: string;
  beneficiary_bank_account_no: string;
  swift_code: string;
  iban: string;
  branch_name: string;
  branch_address: string;
}

export type IBankDetailsResponse = {
  response: {
    data: IBankDetails;
    message: IBankDetails;
  };
} & IBaseResponse;
