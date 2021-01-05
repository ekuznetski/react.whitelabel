import { ECurrencyCode } from '@domain/enums';
import i18n from '@i18next';
import React from 'react';

const t = i18n.getLazyT;

interface IConfig {
  banks: { [k in keyof ECurrencyCode | string]: any };
}

export const config: IConfig = {
  banks: {
    [ECurrencyCode.usd]: [
      {
        bankTitle: (
          <>
            <b>Barclays</b> Bank
          </>
        ),
        beneficiaryName: 'HYCM (Europe) Limited',
        beneficiaryBankName: 'Barclays Bank PLC',
        beneficiary_bank_address: 'Leicester, Leicestershire, LE87 2BB, UNITED KINGDOM',
        swift: 'BARCGB22',
        iban: 'GB72 BARC 20000084099233',
        accountNumber: '84099233',
        currency: 'USD',
        filename: '111.pdf',
      },
      {
        bankTitle: (
          <>
            <b>Lorem Ipsum</b> Bank
          </>
        ),
        beneficiaryName: 'Lorem (ipsum) Limited',
        beneficiaryBankName: 'Lorem Ipsum Bank PLC',
        beneficiary_bank_address: 'Leicester, Leicestershire, LE87 2BB, UNITED KINGDOM',
        swift: 'BARCGB22',
        iban: 'GB33 BARC 20000078462877',
        accountNumber: '78462877',
        currency: 'USD',
        filename: '333.pdf',
      },
    ],
    [ECurrencyCode.eur]: [
      {
        bankTitle: (
          <>
            <b>Barclays</b> Bank
          </>
        ),
        beneficiaryName: 'HYCM (Europe) Limited',
        beneficiaryBankName: 'Barclays Bank PLC',
        beneficiary_bank_address: 'Leicester, Leicestershire, LE87 2BB, UNITED KINGDOM',
        swift: 'BARCGB22',
        iban: 'GB33 BARC 20000078462877',
        accountNumber: '78462877',
        currency: 'EUR',
        filename: '222.pdf',
      },
    ],
  },
};
