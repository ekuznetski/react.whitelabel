import i18n from 'i18next';

const t = i18n.getFixedT(i18n.language);

export const config = {
  topBarLinks: [
    {
      url: '/partnerships',
      icon: 'affiliate',
      label: t('Partnership'),
    },
    {
      url: '',
      icon: 'phone',
      label: t('Help Center'),
    },
  ],
};
