import i18n from '@i18next';
const t = i18n.getLazyT;

export const config = {
  maxTaxCountries: 3,
  haveTinsNumber: [
    { label: t('Yes'), value: true },
    { label: t('No'), value: false },
  ],
  chooseReason: [
    { label: t('My country of residence does not issue Tax IDs'), value: '0' },
    { label: t('I`m not required to register for a Tax ID'), value: '1' },
  ],
};
