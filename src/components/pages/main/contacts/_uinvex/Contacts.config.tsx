import i18n from '@i18next';
const t = i18n.getLazyT;

export const config = {
  contactsList: [
    {
      title: t('Client Support'),
      points: [
        {
          icon: 'envelope',
          label: 'support@uinvex.com',
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
          label: 'accounts@uinvex.com',
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
          label: 'info@uinvex.com',
        },
        {
          icon: 'clock',
          label: '9:00 - 18.00 (GMT +3)',
        },
      ],
    },
  ],
  officeCoords: {
    lat: 51.505076,
    lng: -0.019478,
  },
};
