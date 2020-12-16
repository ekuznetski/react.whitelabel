import * as Action from '@store';
import * as Page from '@components/pages';
import i18n from 'i18next';
import { EAppSection, EResponseStatus, ETradingType } from '@domain/enums';
import { IRouteNavConfig, IRouteRedirectConfig, IRoutesInitialApiData } from '@domain/interfaces';
import {
  allowAuthorizedGuard,
  disallowAuthorizedGuard,
  internalTransfersGuard,
  logoutGuard,
  openDemoAccountGuard,
  openLiveAccountGuard,
  withdrawGuard,
} from '@utils/guards';

const t = i18n.getFixedT(i18n.language, 'meta');

// Data to be loaded on EVERY page of app section
export const routesInitialApiData: IRoutesInitialApiData = {
  [EAppSection.auth]: {
    strict: [Action.ac_fetchGeoIpData, Action.ac_fetchProfile],
  },
  [EAppSection.main]: {
    strict: [Action.ac_fetchGeoIpData, Action.ac_fetchProfile],
  },
  [EAppSection.portal]: {
    strict: [Action.ac_fetchGeoIpData, Action.ac_fetchClientData, Action.ac_fetchProfile],
  },
};

export const routesRedirectConfig: IRouteRedirectConfig[] = [
  // {
  //   path: '',
  //   redirectTo: i18n.language || 'en',
  //   appSection: EAppSection.main,
  // },
];

export const routesNavConfig: IRouteNavConfig[] = [
  {
    meta: {
      title: t('Home:title'),
      desc: t('Home:desc'),
    },
    path: '',
    component: Page.Home,
    appSection: EAppSection.main,
    menuItem: {
      label: 'Home',
    },
  },
  {
    meta: {
      title: t('About:title'),
      desc: t('About:desc'),
    },
    path: '/about',
    component: Page.About,
    appSection: EAppSection.main,
    menuItem: {
      label: 'About Us',
    },
  },
  {
    meta: {
      title: t('Products:title'),
      desc: t('Products:desc'),
    },
    path: '/products',
    component: Page.Products,
    appSection: EAppSection.main,
    menuItem: {
      label: 'Range of Markets',
    },
  },
  {
    meta: {
      title: t('Platform:title'),
      desc: t('Platform:desc'),
    },
    path: '/platform',
    component: Page.Platform,
    appSection: EAppSection.main,
    menuItem: {
      label: 'Platforms',
    },
  },
  {
    meta: {
      title: t('Contacts:title'),
      desc: t('Contacts:desc'),
    },
    path: '/contacts',
    component: Page.Contacts,
    appSection: EAppSection.main,
    menuItem: {
      label: 'Contact Us',
    },
  },
  {
    meta: {
      title: t('Partnerships:title'),
      desc: t('Partnerships:desc'),
    },
    path: '/partnerships',
    component: Page.Partnerships,
    appSection: EAppSection.main,
  },
  {
    meta: {
      title: t('Leverage:title'),
      desc: t('Leverage:desc'),
    },
    path: '/leverage',
    component: Page.Leverage,
    appSection: EAppSection.main,
  },
  {
    meta: {
      title: t('Login:title'),
    },
    path: '/login',
    component: Page.Login,
    activators: [disallowAuthorizedGuard],
    appSection: EAppSection.auth,
  },
  {
    meta: {
      title: 'Logout',
    },
    path: '/logout',
    component: null,
    activators: [logoutGuard],
    apiData: {
      strict: [Action.ac_logout],
    },
    appSection: EAppSection.auth,
  },
  {
    meta: {
      title: t('Forgot Password:title'),
    },
    path: '/forgot-password',
    component: Page.ForgotPassword,
    activators: [disallowAuthorizedGuard],
    appSection: EAppSection.auth,
  },
  {
    meta: {
      title: t('Reset Password:title'),
    },
    path: '/reset-password',
    component: Page.ResetPassword,
    activators: [disallowAuthorizedGuard],
    appSection: EAppSection.auth,
  },
  {
    meta: {
      title: t('Registration:title'),
      desc: t('Registration:desc'),
    },
    path: '/registration',
    component: Page.Registration,
    activators: [disallowAuthorizedGuard],
    appSection: EAppSection.auth,
    apiData: {
      lazy: [Action.ac_fetchGeoIpData],
    },
  },
  {
    meta: {
      title: t('Dashboard:title'),
    },
    path: '/dashboard',
    component: Page.Dashboard,
    appSection: EAppSection.portal,
    activators: [allowAuthorizedGuard],
    apiData: {
      strict: [Action.ac_fetchTradingAccounts],
    },
  },
  {
    meta: {
      title: t('Deposit:title'),
    },
    path: '/deposit',
    component: Page.Deposit,
    appSection: EAppSection.portal,
    activators: [allowAuthorizedGuard],
    apiData: {
      strict: [Action.ac_fetchTradingAccounts],
    },
    menuItem: {
      label: 'Deposit',
      icon: 'coins',
      parent: { label: 'Funds Management', icon: 'money' },
    },
  },
  {
    meta: {
      title: t('Success Deposit:title'),
    },
    path: '/deposit/success',
    component: Page.Deposit,
    state: { depositResult: EResponseStatus.success },
    appSection: EAppSection.portal,
    activators: [allowAuthorizedGuard],
    apiData: {
      strict: [Action.ac_fetchTradingAccounts],
    },
  },
  {
    meta: {
      title: t('Failure Deposit:title'),
    },
    path: '/deposit/failure',
    component: Page.Deposit,
    state: { depositResult: EResponseStatus.failure },
    appSection: EAppSection.portal,
    activators: [allowAuthorizedGuard],
    apiData: {
      strict: [Action.ac_fetchTradingAccounts],
    },
  },
  {
    meta: {
      title: t('Withdrawal:title'),
    },
    path: '/withdrawal',
    component: Page.Withdrawal,
    appSection: EAppSection.portal,
    activators: [allowAuthorizedGuard, withdrawGuard],
    apiData: {
      lazy: [Action.ac_fetchWithdrawHistory],
      strict: [Action.ac_fetchTradingAccounts],
    },
    menuItem: {
      label: 'Withdrawal',
      icon: 'coins',
      parent: 'Funds Management',
    },
  },
  {
    meta: {
      title: t('Internal Transfers:title'),
    },
    path: '/transfers',
    component: Page.InternalTransfer,
    appSection: EAppSection.portal,
    activators: [allowAuthorizedGuard, internalTransfersGuard],
    apiData: {
      strict: [Action.ac_fetchTradingAccounts],
    },
    menuItem: {
      label: 'Internal Transfers',
      icon: 'internal-transfer',
      parent: 'Funds Management',
    },
  },
  {
    meta: {
      title: t('Transactional Statement:title'),
    },
    path: '/statement',
    component: Page.TransactionStatement,
    appSection: EAppSection.portal,
    activators: [allowAuthorizedGuard],
    menuItem: {
      label: 'Transactional Statement',
      icon: 'coins',
      parent: 'Funds Management',
    },
  },
  {
    meta: {
      title: t('Open Live Account:title'),
    },
    path: '/open-account/live',
    component: Page.OpenAccount,
    appSection: EAppSection.portal,
    activators: [allowAuthorizedGuard, openLiveAccountGuard],
    state: {
      accountType: ETradingType.live,
    },
    menuItem: {
      label: 'Open Live Account',
      icon: 'filter',
      parent: { label: 'Trading Accounts', icon: 'trading_graph' },
    },
  },
  {
    meta: {
      title: t('Open Demo Account:title'),
    },
    path: '/open-account/demo',
    component: Page.OpenAccount,
    appSection: EAppSection.portal,
    activators: [allowAuthorizedGuard, openDemoAccountGuard],
    state: {
      accountType: ETradingType.demo,
    },
    menuItem: {
      label: 'Open Demo Account',
      icon: 'filter',
      parent: { label: 'Trading Accounts', icon: 'trading_graph' },
    },
  },
  {
    meta: {
      title: t('Platform Download:title'),
    },
    path: '/download',
    component: Page.PlatformDownload,
    appSection: EAppSection.portal,
    activators: [allowAuthorizedGuard],
    menuItem: {
      label: 'Platform Download',
      icon: 'coins',
      parent: { label: 'Tools', icon: 'documents' },
    },
  },
  {
    meta: {
      title: t('Profile:title'),
    },
    path: '/profile',
    component: Page.Profile,
    appSection: EAppSection.portal,
    apiData: {
      strict: [Action.ac_fetchBankDetails],
    },
    activators: [allowAuthorizedGuard],
  },
  {
    meta: {
      title: t('Verification:title'),
    },
    path: '/verification',
    component: Page.Verification,
    appSection: EAppSection.portal,
    apiData: {
      strict: [Action.ac_fetchDocuments], // TINS, CCard Data
    },
    activators: [allowAuthorizedGuard],
  },
  {
    meta: {
      title: t('Invite Friends:title'),
    },
    path: '/invite-friends',
    component: Page.Verification,
    appSection: EAppSection.portal,
    activators: [allowAuthorizedGuard],
  },
];

export const routesConfig = [...routesRedirectConfig, ...routesNavConfig];
