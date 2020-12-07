import * as Page from '@components/pages';
import {
  ac_fetchBankDetails,
  ac_fetchClientData,
  ac_fetchDocuments,
  ac_fetchGeoIpData,
  ac_fetchProfile,
  ac_fetchTradingAccounts,
  ac_fetchWithdrawHistory,
  ac_logout,
} from '@store';
import { allowAuthorizedGuard, disallowAuthorizedGuard, logoutGuard } from '@utils/guards';
import { EAppSection, EResponseStatus, ETradingType } from '../enums';
import { IRouteNavConfig, IRouteRedirectConfig, IRoutesInitialApiData } from '../interfaces';
import i18n from 'i18next';

// Data to be loaded on EVERY page of app section
export const routesInitialApiData: IRoutesInitialApiData = {
  [EAppSection.auth]: {
    strict: [ac_fetchGeoIpData, ac_fetchProfile],
  },
  [EAppSection.main]: {
    strict: [ac_fetchGeoIpData, ac_fetchProfile],
  },
  [EAppSection.portal]: {
    strict: [ac_fetchGeoIpData, ac_fetchClientData, ac_fetchProfile],
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
      title: 'Home',
    },
    path: '',
    component: Page.Home,
    appSection: EAppSection.main,
    menuItem: true,
  },
  {
    meta: {
      title: 'About',
    },
    path: '/about',
    component: Page.About,
    appSection: EAppSection.main,
    menuItem: true,
  },
  {
    meta: {
      title: 'Products',
    },
    path: '/products',
    component: Page.Products,
    appSection: EAppSection.main,
    menuItem: true,
  },
  {
    meta: {
      title: 'Platform',
    },
    path: '/platform',
    component: Page.Platform,
    appSection: EAppSection.main,
    menuItem: true,
  },
  {
    meta: {
      title: 'Contacts',
    },
    path: '/contacts',
    component: Page.Contacts,
    appSection: EAppSection.main,
    menuItem: true,
  },
  {
    meta: {
      title: 'Partnership',
    },
    path: '/partnerships',
    component: Page.Partnerships,
    appSection: EAppSection.main,
    menuItem: false,
  },
  {
    meta: {
      title: 'Login',
    },
    path: '/login',
    component: Page.Login,
    activators: [disallowAuthorizedGuard],
    appSection: EAppSection.auth,
    menuItem: false,
  },
  {
    meta: {
      title: 'Logout',
    },
    path: '/logout',
    component: null,
    activators: [logoutGuard],
    apiData: {
      strict: [ac_logout],
    },
    appSection: EAppSection.auth,
    menuItem: false,
  },
  {
    meta: {
      title: 'Forgot Password',
    },
    path: '/forgot-password',
    component: Page.ForgotPassword,
    activators: [disallowAuthorizedGuard],
    appSection: EAppSection.auth,
    menuItem: false,
  },
  {
    meta: {
      title: 'Reset Password',
    },
    path: '/forgot-password/reset',
    component: Page.ResetPassword,
    activators: [disallowAuthorizedGuard],
    appSection: EAppSection.auth,
    menuItem: false,
  },
  {
    meta: {
      title: 'Registration',
    },
    path: '/registration',
    component: Page.Registration,
    activators: [disallowAuthorizedGuard],
    appSection: EAppSection.auth,
    apiData: {
      lazy: [ac_fetchGeoIpData],
    },
    menuItem: false,
  },
  {
    meta: {
      title: 'Dashboard',
    },
    path: '/dashboard',
    component: Page.Dashboard,
    appSection: EAppSection.portal,
    activators: [allowAuthorizedGuard],
    apiData: {
      strict: [ac_fetchTradingAccounts],
    },
    menuItem: false,
  },
  {
    meta: {
      title: 'Deposit',
    },
    path: '/deposit',
    component: Page.Deposit,
    appSection: EAppSection.portal,
    activators: [allowAuthorizedGuard],
    apiData: {
      strict: [ac_fetchTradingAccounts],
    },
    menuItem: {
      icon: 'coins',
      parent: { title: 'Funds Management', icon: 'money' },
    },
  },
  {
    meta: {
      title: 'Success Deposit',
    },
    path: '/deposit/success',
    component: Page.Deposit,
    state: { depositResult: EResponseStatus.success },
    appSection: EAppSection.portal,
    activators: [allowAuthorizedGuard],
    apiData: {
      strict: [ac_fetchTradingAccounts],
    },
    menuItem: false,
  },
  {
    meta: {
      title: 'Failure Deposit',
    },
    path: '/deposit/failure',
    component: Page.Deposit,
    state: { depositResult: EResponseStatus.failure },
    appSection: EAppSection.portal,
    activators: [allowAuthorizedGuard],
    apiData: {
      strict: [ac_fetchTradingAccounts],
    },
    menuItem: false,
  },
  {
    meta: {
      title: 'Withdrawal',
    },
    path: '/withdrawal',
    component: Page.Withdrawal,
    appSection: EAppSection.portal,
    activators: [allowAuthorizedGuard],
    apiData: {
      lazy: [ac_fetchWithdrawHistory],
      strict: [ac_fetchTradingAccounts],
    },
    menuItem: {
      icon: 'coins',
      parent: 'Funds Management',
    },
  },
  {
    meta: {
      title: 'Internal Transfers',
    },
    path: '/transfers',
    component: Page.InternalTransfer,
    appSection: EAppSection.portal,
    activators: [allowAuthorizedGuard],
    apiData: {
      strict: [ac_fetchTradingAccounts],
    },
    menuItem: {
      icon: 'internal-transfer',
      parent: 'Funds Management',
    },
  },
  {
    meta: {
      title: 'Transactional Statement',
    },
    path: '/statement',
    component: Page.TransactionStatement,
    appSection: EAppSection.portal,
    activators: [allowAuthorizedGuard],
    menuItem: {
      icon: 'coins',
      parent: 'Funds Management',
    },
  },
  {
    meta: {
      title: 'Open Live Account',
    },
    path: '/open-account/live',
    component: Page.OpenAccount,
    appSection: EAppSection.portal,
    activators: [allowAuthorizedGuard],
    state: {
      accountType: ETradingType.live,
    },
    menuItem: {
      icon: 'filter',
      parent: { title: 'Trading Accounts', icon: 'trading_graph' },
    },
  },
  {
    meta: {
      title: 'Open Demo Account',
    },
    path: '/open-account/demo',
    component: Page.OpenAccount,
    appSection: EAppSection.portal,
    activators: [allowAuthorizedGuard],
    state: {
      accountType: ETradingType.demo,
    },
    menuItem: {
      icon: 'filter',
      parent: { title: 'Trading Accounts', icon: 'trading_graph' },
    },
  },
  {
    meta: {
      title: 'Platform Download',
    },
    path: '/download',
    component: Page.PlatformDownload,
    appSection: EAppSection.portal,
    activators: [allowAuthorizedGuard],
    menuItem: {
      icon: 'coins',
      parent: { title: 'Tools', icon: 'documents' },
    },
  },
  {
    meta: {
      title: 'Profile',
    },
    path: '/profile',
    component: Page.Profile,
    appSection: EAppSection.portal,
    apiData: {
      strict: [ac_fetchBankDetails],
    },
    activators: [allowAuthorizedGuard],
    menuItem: false,
  },
  {
    meta: {
      title: 'Verification',
    },
    path: '/verification',
    component: Page.Verification,
    appSection: EAppSection.portal,
    apiData: {
      strict: [ac_fetchDocuments],
    },
    // apiData: {
    //   strict: [ac_fetchBankDetails], // TINS, CCard Data
    // },
    activators: [allowAuthorizedGuard],
    menuItem: false,
  },
];

export const routesConfig = [...routesRedirectConfig, ...routesNavConfig];
