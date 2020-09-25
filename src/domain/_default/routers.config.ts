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
	Platform,
	Products,
	Profile,
	Registration,
	RestorePassword,
	TransactionStatement,
	Withdrawal,
	PlatformDownload,
} from '@components/pages';
import { ac_fetchGeoIpData, ac_fetchWithdrawHistory, ac_fetchClientData, ac_fetchTradingAccounts } from '@store';
import { userAuthorized } from '@utils/guards';
import { EAppSection, ETradingType } from '../enums';
import { IRouteNavConfig, IRouteRedirectConfig, IRoutesInitialApiData } from '../interfaces';

// Data to be loaded on EVERY page of app section
export const routesInitialApiData: IRoutesInitialApiData = {
	[EAppSection.auth]: {
		optional: [ac_fetchGeoIpData],
	},
	[EAppSection.main]: {
		optional: [ac_fetchGeoIpData],
	},
	[EAppSection.portal]: {
		optional: [ac_fetchGeoIpData, ac_fetchClientData],
	},
};

export const routesRedirectConfig: IRouteRedirectConfig[] = [];

export const routesNavConfig: IRouteNavConfig[] = [
	{
		meta: {
			title: 'Home',
		},
		path: '/',
		component: Home,
		appSection: EAppSection.main,
		apiData: {
			optional: [ac_fetchGeoIpData],
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
			title: 'Login',
		},
		path: '/login',
		component: Login,
		appSection: EAppSection.auth,
		menuItem: false,
	},
	{
		meta: {
			title: 'Forgot Password',
		},
		path: '/forgot-password',
		component: ForgotPassword,
		appSection: EAppSection.auth,
		menuItem: false,
	},
	{
		meta: {
			title: 'Restore Password',
		},
		path: '/restore-password',
		component: RestorePassword,
		appSection: EAppSection.auth,
		menuItem: false,
	},
	{
		meta: {
			title: 'Registration',
		},
		path: '/registration',
		component: Registration,
		appSection: EAppSection.auth,
		apiData: {
			optional: [ac_fetchGeoIpData],
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
		activators: [userAuthorized],
		apiData: {
			required: [ac_fetchTradingAccounts],
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
		activators: [userAuthorized],
		apiData: {
			required: [ac_fetchTradingAccounts],
		},
		menuItem: {
			icon: 'coins.svg',
			parent: { title: 'Funds Management', icon: 'money.svg' },
		},
	},
	{
		meta: {
			title: 'Withdrawal',
		},
		path: '/withdrawal',
		component: Withdrawal,
		appSection: EAppSection.portal,
		activators: [userAuthorized],
		apiData: {
			optional: [ac_fetchWithdrawHistory],
			required: [ac_fetchTradingAccounts],
		},
		menuItem: {
			icon: 'coins.svg',
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
		activators: [userAuthorized],
		apiData: {
			required: [ac_fetchTradingAccounts],
		},
		menuItem: {
			icon: 'coins.svg',
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
		activators: [userAuthorized],
		menuItem: {
			icon: 'coins.svg',
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
		activators: [userAuthorized],
		state: {
			accountType: ETradingType.live,
		},
		menuItem: {
			icon: 'filter.svg',
			parent: { title: 'Trading Accounts', icon: 'trading_graph.svg' },
		},
	},
	{
		meta: {
			title: 'Open Demo Account',
		},
		path: '/open-account/demo',
		component: OpenAccount,
		appSection: EAppSection.portal,
		activators: [userAuthorized],
		state: {
			accountType: ETradingType.demo,
		},
		menuItem: {
			icon: 'filter.svg',
			parent: { title: 'Trading Accounts', icon: 'trading_graph.svg' },
		},
	},
	{
		meta: {
			title: 'Platform Download',
		},
		path: '/download',
		component: PlatformDownload,
		appSection: EAppSection.portal,
		activators: [userAuthorized],
		menuItem: {
			icon: 'coins.svg',
			parent: { title: 'Tools', icon: 'documents.svg' },
		},
	},
	{
		meta: {
			title: 'Profile',
		},
		path: '/profile',
		component: Profile,
		appSection: EAppSection.portal,
		activators: [userAuthorized],
		menuItem: false,
	},
];

export const routesConfig = [...routesRedirectConfig, ...routesNavConfig];
