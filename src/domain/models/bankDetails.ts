import { IBankDetails } from '@domain/interfaces';

export class MBankDetails {
  beneficiary_name: string;
  beneficiary_bank: string;
  beneficiary_bank_account_no: string;
  swift_code: string;
  iban: string;
  branch_name: string;
  branch_address: string;

  constructor(props: IBankDetails) {
    this.beneficiary_name = props.beneficiary_name || '';
    this.beneficiary_bank = props.beneficiary_bank || '';
    this.beneficiary_bank_account_no = props.beneficiary_bank_account_no || '';
    this.swift_code = props.swift_code || '';
    this.iban = props.iban || '';
    this.branch_name = props.branch_name || '';
    this.branch_address = props.branch_address || '';
  }
}
