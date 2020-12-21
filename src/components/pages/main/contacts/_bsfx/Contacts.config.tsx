import i18n from 'i18next';
const t = i18n.getFixedT(i18n.language);

export const config = {
  contactsList: [
    {
      title: t('Client Support'),
      points: [
        {
          icon: 'envelope',
          label: 'support@bluesquarefx.com',
        },
        {
          icon: 'clock',
          label: t('Working hours 24 5'),
        },
      ],
    },
    {
      title: t('Account Opening'),
      points: [
        {
          icon: 'envelope',
          label: 'sales@bluesquarefx.com',
        },
        {
          icon: 'clock',
          label: t('Working hours 24 5'),
        },
      ],
    },
    {
      title: t('Complaints'),
      points: [
        {
          icon: 'envelope',
          label: 'compliance@bluesquarefx.com',
        },
        {
          icon: 'clock',
          label: '9:00 - 18.00 (GMT +3)',
        },
      ],
    },
    {
      title: t('Our Offices'),
      points: [
        {
          icon: 'envelope',
          label: 'info@bluesquarefx.com',
        },
        {
          icon: 'marker',
          label: 'United Kingdom Canary Wharf, London, E14 5AA',
        },
      ],
    },
  ],
  officeCoords: {
    lat: 51.505076,
    lng: -0.019478,
  },
};
