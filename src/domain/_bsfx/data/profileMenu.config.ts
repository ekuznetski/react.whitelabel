import i18n from '@i18next';
const t = i18n.getLazyT;

export const profileMenuPortalConfig = [
  {
    icon: 'coins',
    path: '/verification',
    title: t('Verification'),
  },
  {
    icon: 'share',
    path: '/invite-friends',
    title: t('Invite Friends'),
  },
  {
    icon: 'profile',
    path: '/profile',
    title: t('My Profile'),
  },
  {
    icon: 'coins',
    path: '/logout',
    title: t('Log Out'),
  },
];

export const profileMenuMainConfig = [
  {
    path: '/dashboard',
    title: t('Dashboard'),
  },
  {
    path: '/logout',
    title: t('Log Out'),
  },
];
