import * as Action from '@store';
import * as Page from '@components/pages';
import { NotFound } from '@core/404/404';
import i18n from '@i18next';
import { EAppSection, EPagePath, EResponseStatus, ETradingType } from '@domain/enums';
import { IRouteNavConfig, IRouteRedirectConfig, IRoutesInitialApiData } from '@domain/interfaces';
import {
  allowAuthorizedGuard,
  disallowAuthorizedGuard,
  internalTransfersGuard,
  inviteGuard,
  logoutGuard,
  openDemoAccountGuard,
  openLiveAccountGuard,
  withdrawGuard,
} from '@utils/guards';

const t = i18n.getLazyT;
const meta_t = i18n.getFixedT(i18n.language, 'meta');

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
  [EAppSection.general]: {
    strict: [Action.ac_fetchProfile],
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
      title: meta_t('Home:title'),
      desc: meta_t('Home:desc'),
    },
    path: EPagePath.Home,
    component: Page.Home,
    apiData: {
      strict: [Action.ac_fetchPrices],
    },
    appSection: EAppSection.main,
    menuItem: {
      label: t('Home'),
    },
  },
  {
    meta: {
      title: meta_t('About:title'),
      desc: meta_t('About:desc'),
    },
    path: EPagePath.About,
    component: Page.About,
    appSection: EAppSection.main,
    menuItem: {
      label: t('About Us'),
    },
  },
  {
    meta: {
      title: meta_t('Products:title'),
      desc: meta_t('Products:desc'),
    },
    path: EPagePath.Products,
    component: Page.Products,
    appSection: EAppSection.main,
    menuItem: {
      label: t('Products'),
    },
  },
  {
    meta: {
      title: meta_t('Platforms:title'),
      desc: meta_t('Platforms:desc'),
    },
    path: EPagePath.Platform,
    component: Page.Platform,
    apiData: {
      strict: [Action.ac_fetchPrices],
    },
    appSection: EAppSection.main,
    menuItem: {
      label: t('Platforms'),
    },
  },
  {
    meta: {
      title: meta_t('Contacts:title'),
      desc: meta_t('Contacts:desc'),
    },
    path: EPagePath.Contacts,
    component: Page.Contacts,
    appSection: EAppSection.main,
    menuItem: {
      label: t('Contact Us'),
    },
  },
  {
    meta: {
      title: meta_t('Partnerships:title'),
      desc: meta_t('Partnerships:desc'),
    },
    path: EPagePath.Partnerships,
    component: Page.Partnerships,
    appSection: EAppSection.main,
  },
  {
    meta: {
      title: meta_t('Leverage:title'),
      desc: meta_t('Leverage:desc'),
    },
    path: EPagePath.Leverage,
    component: Page.Leverage,
    appSection: EAppSection.main,
  },
  {
    meta: {
      title: meta_t('Login:title'),
    },
    path: EPagePath.Login,
    component: Page.Login,
    activators: [disallowAuthorizedGuard],
    appSection: EAppSection.auth,
  },
  {
    meta: {
      title: meta_t('Login:title'), // MUST BE LOGIN TITLE
    },
    path: EPagePath.Logout,
    component: null,
    activators: [logoutGuard],
    apiData: {
      strict: [Action.ac_logout],
    },
    appSection: EAppSection.auth,
  },
  {
    meta: {
      title: meta_t('Forgot Password:title'),
    },
    path: EPagePath.ForgotPassword,
    component: Page.ForgotPassword,
    activators: [disallowAuthorizedGuard],
    appSection: EAppSection.auth,
  },
  {
    meta: {
      title: meta_t('Reset Password:title'),
    },
    path: EPagePath.ResetPassword,
    component: Page.ResetPassword,
    activators: [disallowAuthorizedGuard],
    appSection: EAppSection.auth,
  },
  {
    meta: {
      title: meta_t('Registration:title'),
      desc: meta_t('Registration:desc'),
    },
    path: EPagePath.Registration,
    component: Page.Registration,
    activators: [disallowAuthorizedGuard],
    appSection: EAppSection.auth,
    apiData: {
      lazy: [Action.ac_fetchGeoIpData],
    },
  },
  {
    meta: {
      title: meta_t('Dashboard:title'),
    },
    path: EPagePath.Dashboard,
    component: Page.Dashboard,
    appSection: EAppSection.portal,
    activators: [allowAuthorizedGuard],
    apiData: {
      strict: [Action.ac_fetchTradingAccounts],
    },
  },
  {
    meta: {
      title: meta_t('Deposit:title'),
    },
    path: EPagePath.Deposit,
    component: Page.Deposit,
    appSection: EAppSection.portal,
    activators: [allowAuthorizedGuard],
    apiData: {
      strict: [Action.ac_fetchTradingAccounts],
    },
    menuItem: {
      label: t('Deposit'),
      icon: 'coins',
      parent: { label: t('Funds Management'), icon: 'money' },
    },
  },
  {
    meta: {
      title: meta_t('Success Deposit:title'),
    },
    path: EPagePath.DepositSuccess,
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
      title: meta_t('Failure Deposit:title'),
    },
    path: EPagePath.DepositFailure,
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
      title: meta_t('Withdrawal:title'),
    },
    path: EPagePath.Withdrawal,
    component: Page.Withdrawal,
    appSection: EAppSection.portal,
    activators: [allowAuthorizedGuard, withdrawGuard],
    apiData: {
      lazy: [Action.ac_fetchWithdrawHistory],
      strict: [Action.ac_fetchTradingAccounts],
    },
    menuItem: {
      label: t('Withdrawal'),
      icon: 'coins',
      parent: 'Funds Management',
    },
  },
  {
    meta: {
      title: meta_t('Internal Transfers:title'),
    },
    path: EPagePath.InternalTransfer,
    component: Page.InternalTransfer,
    appSection: EAppSection.portal,
    activators: [allowAuthorizedGuard, internalTransfersGuard],
    apiData: {
      strict: [Action.ac_fetchTradingAccounts],
    },
    menuItem: {
      label: t('Internal Transfers'),
      icon: 'internal-transfer',
      parent: 'Funds Management',
    },
  },
  {
    meta: {
      title: meta_t('Transactional Statement:title'),
    },
    path: EPagePath.TransactionStatement,
    component: Page.TransactionStatement,
    appSection: EAppSection.portal,
    activators: [allowAuthorizedGuard],
    menuItem: {
      label: t('Transactional Statement'),
      icon: 'statement',
      parent: 'Funds Management',
    },
  },
  {
    meta: {
      title: meta_t('Open Live Account:title'),
    },
    path: EPagePath.OpenLiveAccount,
    component: Page.OpenAccount,
    appSection: EAppSection.portal,
    activators: [allowAuthorizedGuard, openLiveAccountGuard],
    state: {
      accountType: ETradingType.live,
    },
    menuItem: {
      label: t('Open Live Account'),
      icon: 'filter',
      parent: { label: t('Trading Accounts'), icon: 'trading_graph' },
    },
  },
  {
    meta: {
      title: meta_t('Open Demo Account:title'),
    },
    path: EPagePath.OpenDemoAccount,
    component: Page.OpenAccount,
    appSection: EAppSection.portal,
    activators: [allowAuthorizedGuard, openDemoAccountGuard],
    state: {
      accountType: ETradingType.demo,
    },
    menuItem: {
      label: t('Open Demo Account'),
      icon: 'filter',
      parent: { label: t('Trading Accounts'), icon: 'trading_graph' },
    },
  },
  {
    meta: {
      title: meta_t('Platform Download:title'),
    },
    path: EPagePath.PlatformDownload,
    component: Page.PlatformDownload,
    appSection: EAppSection.portal,
    activators: [allowAuthorizedGuard],
    menuItem: {
      label: t('Platform Download'),
      icon: 'downloadPlatform',
      parent: { label: t('Tools'), icon: 'documents' },
    },
  },
  {
    meta: {
      title: meta_t('Profile:title'),
    },
    path: EPagePath.Profile,
    component: Page.Profile,
    appSection: EAppSection.portal,
    apiData: {
      strict: [Action.ac_fetchBankDetails],
    },
    activators: [allowAuthorizedGuard],
  },
  {
    meta: {
      title: meta_t('Verification:title'),
    },
    path: EPagePath.Verification,
    component: Page.Verification,
    appSection: EAppSection.portal,
    apiData: {
      strict: [Action.ac_fetchDocuments], // TINS, CCard Data
    },
    activators: [allowAuthorizedGuard],
  },
  {
    meta: {
      title: meta_t('Invite Friends:title'),
    },
    path: EPagePath.Verification,
    component: Page.Verification,
    appSection: EAppSection.portal,
    activators: [allowAuthorizedGuard],
  },
  {
    meta: {
      title: meta_t('Not Found:title'),
    },
    path: EPagePath.NotFound,
    component: NotFound,
    appSection: EAppSection.general,
  },
  {
    meta: {
      title: meta_t('Home:title'),
      desc: meta_t('Home:desc'),
    },
    path: EPagePath.Invite,
    component: null,
    appSection: EAppSection.general,
    activators: [inviteGuard],
  },
];

export const routesConfig = [...routesRedirectConfig, ...routesNavConfig];
