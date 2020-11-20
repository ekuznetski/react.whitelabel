import {
  About,
  Contacts,
  Dashboard,
  Deposit,
  ForgotPassword,
  Home,
  InternalTransfer,
  Login,
  OpenAccount,
  Partnerships,
  Platform,
  PlatformDownload,
  Products,
  Profile,
  Registration,
  ResetPassword,
  TransactionStatement,
  Verification,
  Withdrawal,
} from '@components/pages';
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

export const routesRedirectConfig: IRouteRedirectConfig[] = [];

export const routesNavConfig: IRouteNavConfig[] = [
  {
    meta: {
      title: 'Home',
    },
    path: '',
    component: Home,
    appSection: EAppSection.main,
    apiData: {
      lazy: [ac_fetchGeoIpData],
    },
    menuItem: true,
  },
  {
    meta: {
      title: 'About',
    },
    path: '/about',
    component: About,
    appSection: EAppSection.main,
    menuItem: true,
  },
  {
    meta: {
      title: 'Products',
    },
    path: '/products',
    component: Products,
    appSection: EAppSection.main,
    menuItem: true,
  },
  {
    meta: {
      title: 'Platform',
    },
    path: '/platform',
    component: Platform,
    appSection: EAppSection.main,
    menuItem: true,
  },
  {
    meta: {
      title: 'Contacts',
    },
    path: '/contacts',
    component: Contacts,
    appSection: EAppSection.main,
    menuItem: true,
  },
  {
    meta: {
      title: 'Partnership',
    },
    path: '/partnerships',
    component: Partnerships,
    appSection: EAppSection.main,
    menuItem: false,
  },
  {
    meta: {
      title: 'Login',
    },
    path: '/login',
    component: Login,
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
    component: ForgotPassword,
    activators: [disallowAuthorizedGuard],
    appSection: EAppSection.auth,
    menuItem: false,
  },
  {
    meta: {
      title: 'Reset Password',
    },
    path: '/forgot-password/reset',
    component: ResetPassword,
    activators: [disallowAuthorizedGuard],
    appSection: EAppSection.auth,
    menuItem: false,
  },
  {
    meta: {
      title: 'Registration',
    },
    path: '/registration',
    component: Registration,
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
    component: Dashboard,
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
    component: Deposit,
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
    component: Deposit,
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
    component: Deposit,
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
    component: Withdrawal,
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
    component: InternalTransfer,
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
    component: TransactionStatement,
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
    component: OpenAccount,
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
    component: OpenAccount,
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
    component: PlatformDownload,
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
    component: Profile,
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
    component: Verification,
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
