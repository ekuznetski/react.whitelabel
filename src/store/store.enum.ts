export enum EActionTypes {
	// Data - Content
	fetchContent = '[DATA - Content] Fetch',
	saveContent = '[DATA - Content] Save',

	// Data - GeoIP
	fetchGeoIpData = '[DATA - GeoIP] Fetch',
	saveGeoIpData = '[DATA - GeoIP] Save',

	// DATA - Client
	register = '[DATA - Client] Set Profile',
	fetchProfile = '[DATA - Client] Fetch Profile',
	saveProfile = '[DATA - Client] Save Profile',
	login = '[DATA - Client] Login',
	fetchClientData = '[DATA - Client] Fetch Status & Data',
	saveClientData = '[DATA - Client] Save Status & Data',
	fetchTradingAccounts = '[DATA - Client] Fetch Trading Accounts',
	saveTradingAccounts = '[DATA - Client] Save Trading Accounts',

	// DATA - Accounts
	makeInternalTransfer = '[DATA - Account] Internal Transfer',

	// DATA - Withdrawal
	fetchWithdrawHistory = '[DATA - Withdrawal] Fetch History',
	saveWithdrawHistory = '[DATA - Withdrawal] Save History',
	fetchWithdrawLimit = '[DATA - Withdrawal] Fetch Account Limit',
	saveWithdrawLimit = '[DATA - Withdrawal] Save Account Limit',

	//DATA - Authorization
	forgotPassword = '[DATA - Authorization] Forgot Password',
	resetPassword = '[DATA - Authorization] Reset Password',

	// APP - Route
	updateRoute = '[APP - Route] Update Params',

	// APP - Request
	requestSuccess = '[APP - Request] Success',
	requestFailure = '[APP - Request] Failure',

	//APP - Notification
	showNotification = '[APP - Notification] Show',
	hideNotification = '[APP - Notification] Hide',

	// APP - Registration
	userExists = '[APP - Registration] User Exists',
	saveUserExists = '[APP - Registration] Save User Exists', //todo remove
	preRegister = '[APP - Registration] Client Add',
	saveClientAdd = '[APP - Registration] Save Client Add', //todo remove
}
