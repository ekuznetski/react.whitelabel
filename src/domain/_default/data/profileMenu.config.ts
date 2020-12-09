import i18n from 'i18next';
const t = i18n.getFixedT(i18n.language);

export const profileMenuPortalConfig = [
  {
    icon: 'coins',
    path: '/verification',
    title: t('Verification'),
  },
  {
    icon: 'coins',
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
    icon: 'coins',
    path: '/dashboard',
    title: t('Dashboard'),
  },
  {
    icon: 'coins',
    path: '/logout',
    title: t('Log Out'),
  },
];
