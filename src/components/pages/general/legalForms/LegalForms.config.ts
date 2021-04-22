import { files } from '@domain';
import i18n from '@i18next';

const t = i18n.getLazyT;

export const config = {
  documents: [
    { title: t('Customer Agreement'), link: files.customerAgreement },
    { title: t('Execution Policy'), link: files.executionPolicy },
    { title: t('Disclaimer'), link: files.disclaimer },
    { title: t('Preventing Money Laundering'), link: files.preventingMoneyLaundering },
    { title: t('Privacy Policy'), link: files.privacyPolicy },
    { title: t('Terms of Business'), link: files.termsOfBusiness },
  ],
};
