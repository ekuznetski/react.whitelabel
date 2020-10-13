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
  editProfile = '[DATA - Client] Edit Profile',
  login = '[DATA - Client] Login',
  logout = '[DATA - Client] Logout',
  fetchClientData = '[DATA - Client] Fetch Status & Data',
  saveClientData = '[DATA - Client] Save Status & Data',
  fetchTradingAccounts = '[DATA - Client] Fetch Trading Accounts',
  saveTradingAccounts = '[DATA - Client] Save Trading Accounts',
  fetchTransactionalStatements = '[DATA - Client] Fetch Transactional Statements',
  saveTransactionalStatements = '[DATA - Client] Save Transactional Statements',

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

  // DATA
  clearStore = '[DATA] Clear Store',

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
  preRegister = '[APP - Registration] Client Add',
}
