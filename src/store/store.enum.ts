export enum EActionTypes {
  // Data - Prices
  fetchPrices = '[DATA - Prices] Fetch',
  savePrices = '[DATA - Prices] Save',

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
  fetchClientSettings = '[DATA - Client] Fetch Client Settings',
  saveClientSettings = '[DATA - Client] Save Client Settings',
  editProfile = '[DATA - Client] Edit Profile',
  changePassword = '[DATA - Client] Change Password',
  login = '[DATA - Client] Login',
  logout = '[DATA - Client] Logout',
  fetchClientData = '[DATA - Client] Fetch Status & Data',
  saveClientData = '[DATA - Client] Save Status & Data',
  fetchTradingAccounts = '[DATA - Client] Fetch Trading Accounts',
  saveTradingAccounts = '[DATA - Client] Save Trading Accounts',
  fetchTransactionalStatements = '[DATA - Client] Fetch Transactional Statements',
  clearTransactionalStatements = '[DATA - Client] Clear Transactional Statements',
  saveTransactionalStatements = '[DATA - Client] Save Transactional Statements',
  saveTins = '[DATA - Client] Save Tins',
  updateTins = '[DATA - Client] Update Tins',
  saveEdd = '[DATA - Client] Save Edd',
  submitEdd = '[DATA - Client] Submit Edd',

  // DATA - Financial Profile
  submitFinancialProfile = '[DATA - Financial Profile] Submit',

  // DATA - Document
  saveDocuments = '[DATA - Documents] Save',
  uploadDocuments = '[DATA - Documents] Upload Documents',

  // DATA - Bank Details
  fetchBankDetails = '[DATA - Bank] Fetch Bank Details',
  updateBankDetails = '[DATA - Bank] Update Bank Details',
  saveBankDetails = '[DATA - Bank] Save Bank Details',

  // DATA - Accounts
  makeInternalTransfer = '[DATA - Account] Internal Transfer',
  createLiveTradingAccount = '[DATA - Account] Create Live Account',
  createMt4LiveTradingAccount = '[DATA - Account] Create Mt4 Live Account',
  createMt5LiveTradingAccount = '[DATA - Account] Create Mt5 Live Account',
  createDemoTradingAccount = '[DATA - Account] Create Demo Account',
  createMt4DemoTradingAccount = '[DATA - Account] Create Mt4 Demo Account',
  createMt5DemoTradingAccount = '[DATA - Account] Create Mt5 Demo Account',
  changeAccountLeverage = '[DATA - Account] Change Account Leverage',
  changeAccountPassword = '[DATA - Account] Change Account Password',
  changeAccountSettings = '[DATA - Account] Change Account Settings',

  // DATA - Withdrawal
  fetchWithdrawHistory = '[DATA - Withdrawal] Fetch History',
  saveWithdrawHistory = '[DATA - Withdrawal] Save History',
  fetchWithdrawLimit = '[DATA - Withdrawal] Fetch Account Limit',
  saveWithdrawLimit = '[DATA - Withdrawal] Save Account Limit',
  withdrawFunds = '[DATA - Withdrawal] Withdraw Funds',
  withdrawMt4Funds = '[DATA - Withdrawal] Withdraw Mt4 Funds',
  withdrawMt5Funds = '[DATA - Withdrawal] Withdraw Mt5 Funds',
  cancelWithdraw = '[DATA - Withdrawal] Cancel Task',

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

  //APP - Modal
  showModal = '[APP - Modal] Show',
  hideModal = '[APP - Modal] Hide',

  // APP - Registration
  userExists = '[APP - Registration] User Exists',
  preRegister = '[APP - Registration] Client Add',

  // APP - Deposit
  addDeposit = '[APP - Deposit] Add',

  //APP - Partnership
  partnershipRegisterIB = '[APP - Partnership] Register IB',
  partnershipRegister = '[APP - Partnership] Register',

  // APP - Share
  sendReferrerLink = '[APP - Share] Send Referrer Link',
}
