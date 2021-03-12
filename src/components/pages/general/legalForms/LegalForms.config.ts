import i18n from '@i18next';

const t = i18n.getLazyT;

export const config = {
  documents: [
    { title: t('Customer Agreement'), link: '#' },
    { title: t('Execution Policy'), link: '/files/order_execution_policy_january_2021.pdf' },
    { title: t('Disclaimer'), link: '/files/disclaimer.pdf' },
    { title: t('Preventing Money Laundering'), link: '/files/preventing_money_laundering.pdf' },
    { title: t('Privacy Policy'), link: '/files/privacy_policy.pdf' },
    { title: t('Terms of Business'), link: '/files/terms_of_business_january_2021.pdf' },
  ],
};
