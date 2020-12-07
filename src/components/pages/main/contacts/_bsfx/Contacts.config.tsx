import i18n from 'i18next';
const t = i18n.getFixedT(i18n.language);

export const config = {
  contactsList: [
    {
      title: t('Account Opening'),
      points: [
        {
          icon: 'clock',
          label: t('Working hours 24 5'),
        },
        {
          icon: 'envelope',
          label: 'support@BSFX.com',
        },
      ],
    },
    {
      title: t('Our Offices'),
      points: [
        {
          icon: 'marker',
          label: 'United Kingdom Canary Wharf, London, E14 5AA',
        },
        {
          icon: 'envelope',
          label: 'info@bluesquarefx.com',
        },
      ],
    },
  ],
  officeCoords: {
    lat: 51.505076,
    lng: -0.019478,
  },
};