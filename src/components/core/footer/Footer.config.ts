import i18n from 'i18next';
const t = i18n.getFixedT(i18n.language);

export const config = {
  socialMediaLinks: [
    {
      name: 'Facebook',
      icon: 'facebook',
      link: '',
    },
    {
      name: 'Tweeter',
      icon: 'tweeter',
      link: '',
    },
    {
      name: 'LinkedIn',
      icon: 'linkedin',
      link: '',
    },
    {
      name: 'Instagram',
      icon: 'instagram',
      link: '',
    },
    {
      name: 'YouTube',
      icon: 'youtube',
      link: '',
    },
  ],
  documents: [
    {
      name: t('Legal Forms and Documents'),
      link: '',
    },
    {
      name: t('Risk Warnings'),
      link: '',
    },
    {
      name: t('Cookies Policy'),
      link: '',
    },
  ],
};
