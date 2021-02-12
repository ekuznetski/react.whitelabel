import i18n from '@i18next';
import { EPagePath } from '@domain/enums';

const t = i18n.getLazyT;

export const profileMenuPortalConfig = [
  {
    icon: 'shield',
    path: EPagePath.Verification,
    title: t('Verification'),
  },
  {
    icon: 'share',
    path: EPagePath.InviteFriends,
    title: t('Invite Friends'),
  },
  {
    icon: 'profile',
    path: EPagePath.Profile,
    title: t('My Profile'),
  },
  {
    icon: 'log-out',
    path: EPagePath.Logout,
    title: t('Log Out'),
  },
];

export const profileMenuMainConfig = [
  {
    path: EPagePath.Dashboard,
    title: t('Dashboard'),
  },
  {
    path: EPagePath.Logout,
    title: t('Log Out'),
  },
];
