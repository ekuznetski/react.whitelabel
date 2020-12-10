import * as Page from '@components/pages';
import * as Action from '@store';
import { allowAuthorizedGuard, disallowAuthorizedGuard, logoutGuard } from '@utils/guards';
import { EAppSection, EResponseStatus, ETradingType } from '../enums';
import { IRouteNavConfig, IRouteRedirectConfig, IRoutesInitialApiData } from '../interfaces';

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
      title: 'Home',
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
      title: 'About',
    },
    path: '/about',
    component: Page.About,
    appSection: EAppSection.main,
    menuItem: {
      label: 'About',
    },
  },
  {
    meta: {
      title: 'Products',
    },
    path: '/products',
    component: Page.Products,
    appSection: EAppSection.main,
    menuItem: {
      label: 'Products',
    },
  },
  {
    meta: {
      title: 'Platform',
    },
    path: '/platform',
    component: Page.Platform,
    appSection: EAppSection.main,
    menuItem: {
      label: 'Platform',
    },
  },
  {
    meta: {
      title: 'Contacts',
    },
    path: '/contacts',
    component: Page.Contacts,
    appSection: EAppSection.main,
    menuItem: {
      label: 'Contacts',
    },
  },
  {
    meta: {
      title: 'Partnership',
    },
    path: '/partnerships',
    component: Page.Partnerships,
    appSection: EAppSection.main,
  },
  {
    meta: {
      title: 'Leverage',
    },
    path: '/leverage',
    component: Page.Leverage,
    appSection: EAppSection.main,
  },
  {
    meta: {
      title: 'Login',
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
      title: 'Forgot Password',
    },
    path: '/forgot-password',
    component: Page.ForgotPassword,
    activators: [disallowAuthorizedGuard],
    appSection: EAppSection.auth,
  },
  {
    meta: {
      title: 'Reset Password',
    },
    path: '/reset-password',
    component: Page.ResetPassword,
    activators: [disallowAuthorizedGuard],
    appSection: EAppSection.auth,
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
      lazy: [Action.ac_fetchGeoIpData],
    },
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
      strict: [Action.ac_fetchTradingAccounts],
    },
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
      title: 'Success Deposit',
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
      title: 'Failure Deposit',
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
      title: 'Withdrawal',
    },
    path: '/withdrawal',
    component: Page.Withdrawal,
    appSection: EAppSection.portal,
    activators: [allowAuthorizedGuard],
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
      title: 'Internal Transfers',
    },
    path: '/transfers',
    component: Page.InternalTransfer,
    appSection: EAppSection.portal,
    activators: [allowAuthorizedGuard],
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
      title: 'Transactional Statement',
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
      label: 'Open Live Account',
      icon: 'filter',
      parent: { label: 'Trading Accounts', icon: 'trading_graph' },
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
      label: 'Open Demo Account',
      icon: 'filter',
      parent: { label: 'Trading Accounts', icon: 'trading_graph' },
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
      label: 'Platform Download',
      icon: 'coins',
      parent: { label: 'Tools', icon: 'documents' },
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
      strict: [Action.ac_fetchBankDetails],
    },
    activators: [allowAuthorizedGuard],
  },
  {
    meta: {
      title: 'Verification',
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
      title: 'Invite Friends',
    },
    path: '/invite-friends',
    component: Page.Verification,
    appSection: EAppSection.portal,
    activators: [allowAuthorizedGuard],
  },
];

export const routesConfig = [...routesRedirectConfig, ...routesNavConfig];
