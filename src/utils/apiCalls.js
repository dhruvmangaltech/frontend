import {
  deleteParamsRequest,
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "./axios";

const { REACT_APP_API_URL } = process.env;

// Get request
const getAllPlayers = (params) =>
  getRequest(`${REACT_APP_API_URL}/api/v1/user/`, params);
const getPlayerById = (params) =>
  getRequest(`${REACT_APP_API_URL}/api/v1/user/detail`, params);
const adminRoles = () => getRequest(`${REACT_APP_API_URL}/api/v1/admin/roles`);
const getSiteConfig = () =>
  getRequest(`${REACT_APP_API_URL}/api/v1/admin/config`);
const getStaffGroups = () =>
  getRequest(`${REACT_APP_API_URL}/api/v1/admin/group`);
const getAllAdmins = (params) =>
  getRequest(`${REACT_APP_API_URL}/api/v1/admin/`, params);
const getAdminDetails = (params) =>
  getRequest(`${REACT_APP_API_URL}/api/v1/admin/detail`, params);
const getAdminChildren = (params) =>
  getRequest(`${REACT_APP_API_URL}/api/v1/admin/child`, params);
const getUserDocumentsRequest = (params) =>
  getRequest(`${REACT_APP_API_URL}/api/v1/user/document`, params);
const getPackagesListingRequest = (params) =>
  getRequest(`${REACT_APP_API_URL}/api/v1/package`, params);
const getAllCms = (params) =>
  getRequest(`${REACT_APP_API_URL}/api/v1/cms/`, params);
const getCmsDetail = (params) =>
  getRequest(`${REACT_APP_API_URL}/api/v1/cms/details`, params);
const getCmsDynamicData = () =>
  getRequest(`${REACT_APP_API_URL}/api/v1/cms/dynamic-data`);
const getGallery = () => getRequest(`${REACT_APP_API_URL}/api/v1/gallery`);
const getEmailTemplates = () => getRequest(`${REACT_APP_API_URL}/api/v1/email`);
const getEmailTemplateDetail = ({ emailTemplateId }) =>
  getRequest(`${REACT_APP_API_URL}/api/v1/email/details/${emailTemplateId}`);
const getEmailDynamicData = () =>
  getRequest(`${REACT_APP_API_URL}/api/v1/email/dynamic-data`);
const getCountries = (params) =>
  getRequest(`${REACT_APP_API_URL}/api/v1/country`, params);
const getAllCasinoProviders = (params) =>
  getRequest(`${REACT_APP_API_URL}/api/v1/casino/providers`, params);
const getAllBanners = () => getRequest(`${REACT_APP_API_URL}/api/v1/banner`);
const getAllPopup = () => getRequest(`${REACT_APP_API_URL}/api/v1/popup`);
const getAllCasinoCategories = (params) =>
  getRequest(`${REACT_APP_API_URL}/api/v1/casino/category`, params);
const getAllCasinoSubCategories = (params) =>
  getRequest(`${REACT_APP_API_URL}/api/v1/casino/subcategory`, params);
const getRestrictedCountries = (params) =>
  getRequest(`${REACT_APP_API_URL}/api/v1/country/restricted`, params);
const getUnrestrictedCountries = (params) =>
  getRequest(`${REACT_APP_API_URL}/api/v1/country/unrestricted`, params);
const getEmailCategoryData = () =>
  getRequest(`${REACT_APP_API_URL}/api/v1/email/category`);
const getDynamicEmailKeyData = () =>
  getRequest(`${REACT_APP_API_URL}/api/v1/email/dynamic-data`);
const getBonusDetail = (params) =>
  getRequest(`${REACT_APP_API_URL}/api/v1/bonus/`, params);
const getLiveUsersCount = (params) =>
  getRequest(`${REACT_APP_API_URL}/api/v1/report/dashboard`, params);
const getReports = (params) =>
  getRequest(`${REACT_APP_API_URL}/api/v1/report`, params);
const getReportsAll = (params) =>
  getRequest(`${REACT_APP_API_URL}/api/v1/report/all`, params);
const getGameReport = (params) =>
  getRequest(`${REACT_APP_API_URL}/api/v1/report/dashboard/game`, params);
const elasticCheck = () =>
  getRequest(`${REACT_APP_API_URL}/api/v1/elastic/healthcheck`);
const getPlayerResponsible = (params) =>
  getRequest(
    `${REACT_APP_API_URL}/api/v1/user/user-responsible-setting`,
    params
  );
const getPlayerBankRequest = (params) =>
  getRequest(`${REACT_APP_API_URL}/api/v1/user/bank-details`, params);
const getPlayerCasinoRequest = (params) =>
  getRequest(`${REACT_APP_API_URL}/api/v1/user/casino-detail`, params);
const getAllCasinoGames = (params) =>
  getRequest(`${REACT_APP_API_URL}/api/v1/casino/game`, params);
const getCasinoSubcategoryGames = (params) =>
  getRequest(`${REACT_APP_API_URL}/api/v1/casino/game`, params);
const getRestrictedItems = (params) =>
  getRequest(`${REACT_APP_API_URL}/api/v1/country/restricted/items`, params);
const getUnRestrictedItems = (params) =>
  getRequest(`${REACT_APP_API_URL}/api/v1/country/unrestricted/items`, params);
const getBonusData = (params) =>
  getRequest(`${REACT_APP_API_URL}/api/v1/bonus/`, params);
const getAllTransactions = (params) =>
  getRequest(`${REACT_APP_API_URL}/api/v1/casino/transactions`, params);
const getBankingTransactions = (params) =>
  getRequest(`${REACT_APP_API_URL}/api/v1/payment/transactions`, params);
const getWithdrawRequests = (params) =>
  getRequest(`${REACT_APP_API_URL}/api/v1/payment/redeem-requests`, params);
const getSessionLogs = (params) =>
  getRequest(`${REACT_APP_API_URL}/api/v1/report/session-logs`, params);
const getAuditLogs = (params) =>
  getRequest(`${REACT_APP_API_URL}/api/v1/user/activity-logs`, params);
const getRSGList = (params) =>
  getRequest(
    `${REACT_APP_API_URL}/api/v1/user/user-responsible-setting`,
    params
  );
const getPackagesTypesRequest = (params) =>
  getRequest(`${REACT_APP_API_URL}/api/v1/package/types`);
const getStateListing = (params) =>
  getRequest(`${REACT_APP_API_URL}/api/v1/country/get-state`);
const getAllowedStateListing = (params) =>
  getRequest(`${REACT_APP_API_URL}/api/v1/country/allowed-states`);
const getCityListing = (params) =>
  getRequest(`${REACT_APP_API_URL}/api/v1/country/get-city`, params);
const getCommsLogs = (params) =>
  getRequest(`${REACT_APP_API_URL}/api/v1/user/email-comms-details`, params);
const getActivityTable = (params) =>
  getRequest(`${REACT_APP_API_URL}/api/v1/user/user-activity`, params);
const getUserTickets = (params) =>
  getRequest(`${REACT_APP_API_URL}/api/v1/alert/user-tickets`, params);
const getAgents = (params) =>
  getRequest(`${REACT_APP_API_URL}/api/v1/alert/agent-overview`, params);
const getRules = (params) =>
  getRequest(`${REACT_APP_API_URL}/api/v1/anti-fraud/rules`, params);
const generate2FA = (params) =>
  getRequest(`${REACT_APP_API_URL}/api/v1/admin/generate-otp-2fa`, params);
const getPlayerGroups = () =>
  getRequest(`${REACT_APP_API_URL}/api/v1/anti-fraud/player-group`);
const getAdminsForAlert = () =>
  getRequest(`${REACT_APP_API_URL}/api/v1/alert/admins`);
const getContentPages = (params) =>
  getRequest(`${REACT_APP_API_URL}/api/v1/pages`, params);
const getContentPageDetails = (params) =>
  getRequest(`${REACT_APP_API_URL}/api/v1/pages/details`, params);
const getIps = (params) =>
  getRequest(`${REACT_APP_API_URL}/api/v1/allowed_ip`, params);
const getKYCHistory = (params) =>
  getRequest(`${REACT_APP_API_URL}/api/v1/user/user-kyc`, params);
const getRewardSystemListing = () =>
  getRequest(`${REACT_APP_API_URL}/api/v1/vip-tier`);
const getRewardSystemDetail = (data) =>
  getRequest(`${REACT_APP_API_URL}/api/v1/vip-tier/details`, data);
const getVipTierListing = () =>
  getRequest(`${REACT_APP_API_URL}/api/v1/user/vip-tier-details`);
const getPaymentProviderList = () =>
  getRequest(`${REACT_APP_API_URL}/api/v1/payment-provider`);
const getSpinWheelConfiguration = () =>
  getRequest(`${REACT_APP_API_URL}/api/v1/spinWheelConfiguration`);
const getCasinoAggregators = (params) =>
  getRequest(`${REACT_APP_API_URL}/api/v1/casino/aggregator`, params);
const getRedeemNotification = (params) =>
  getRequest(`${REACT_APP_API_URL}/api/v1/admin/notification`, params);
const getKycLabels = (params) =>
  getRequest(`${REACT_APP_API_URL}/api/v1/kyc/labels`, params);

const getPendingKycList = (params) =>
  getRequest(`${REACT_APP_API_URL}/api/v1/kyc/pending-users`, params);
const getKycCheck = () =>
  getRequest(`${REACT_APP_API_URL}/api/v1/kyc/kyc-check`);

// Post request
const adminLogin = (data) =>
  postRequest(`${REACT_APP_API_URL}/api/v1/admin/login`, data);
const adminLogout = (data) =>
  postRequest(`${REACT_APP_API_URL}/api/v1/admin/logout`, data);
const verify2FA = (data) =>
  postRequest(`${REACT_APP_API_URL}/api/v1/admin/verify-otp-2fa`, data);
const disable2FA = (data) =>
  postRequest(`${REACT_APP_API_URL}/api/v1/admin/disable-auth`, data);
const createStaffAdmin = (data) =>
  postRequest(`${REACT_APP_API_URL}/api/v1/admin/`, data);
const setDailyLimits = (data) =>
  postRequest(`${REACT_APP_API_URL}/api/v1/user/daily-limit`, data);
const setDepositLimits = (data) =>
  postRequest(`${REACT_APP_API_URL}/api/v1/user/deposit-limit`, data);
const setLossLimits = (data) =>
  postRequest(`${REACT_APP_API_URL}/api/v1/user/loss-limit`, data);
const setSessionTime = (data) =>
  postRequest(`${REACT_APP_API_URL}/api/v1/user/session-time`, data);
const setDisableUntil = (data) =>
  postRequest(`${REACT_APP_API_URL}/api/v1/user/disable-until`, data);
const createPackageRequest = (data) =>
  postRequest(`${REACT_APP_API_URL}/api/v1/package`, data, {
    "Content-Type": "multipart/formdata",
  });
const createCms = (data) =>
  postRequest(`${REACT_APP_API_URL}/api/v1/cms/`, data);
const testEmailTemplate = (data) =>
  postRequest(`${REACT_APP_API_URL}/api/v1/email/test`, data);
const createCasinoProvider = (data) =>
  postRequest(`${REACT_APP_API_URL}/api/v1/casino/providers`, data, {
    "Content-Type": "multipart/formdata",
  });
const createBanner = (data) =>
  postRequest(`${REACT_APP_API_URL}/api/v1/banner`, data, {
    "Content-Type": "multipart/formdata",
  });
const createPopup = (data) =>
  postRequest(`${REACT_APP_API_URL}/api/v1/popup`, data, {
    "Content-Type": "multipart/formdata",
  });
const createCasinoCategory = (data) =>
  postRequest(`${REACT_APP_API_URL}/api/v1/casino/category`, data);
const createCasinoSubCategory = (data) =>
  postRequest(`${REACT_APP_API_URL}/api/v1/casino/subcategory`, data, {
    "Content-Type": "multipart/formdata",
  });
const addGamestoSubCategory = (data) =>
  postRequest(`${REACT_APP_API_URL}/api/v1/casino/game`, data);
const createEmailTemplate = (data) =>
  postRequest(`${REACT_APP_API_URL}/api/v1/email/template`, data);
const uploadrubyPlayGames = (data) =>
  postRequest(`${REACT_APP_API_URL}/api/v1/ruby-play`, data, {
    "Content-Type": "multipart/formdata",
  });
const createBonus = (data) =>
  postRequest(`${REACT_APP_API_URL}/api/v1/bonus`, data);
const createDailyBonus = (data) =>
  postRequest(`${REACT_APP_API_URL}/api/v1/bonus`, data, {
    "Content-Type": "multipart/formdata",
  });
const updateResponsibleStatus = (data) =>
  postRequest(
    `${REACT_APP_API_URL}/api/v1/user/update-user-responsible-setting`,
    data
  );
const addComments = (data) =>
  postRequest(`${REACT_APP_API_URL}/api/v1/user/comment/`, data);
const assignTicket = (data) =>
  postRequest(`${REACT_APP_API_URL}/api/v1/alert/assign-ticket`, data);
const verifyOtp = (data) =>
  putRequest(`${REACT_APP_API_URL}/api/v1/admin/verify-otp-2fa`, data);
const createPlayerGroup = (data) =>
  postRequest(`${REACT_APP_API_URL}/api/v1/anti-fraud/player-group`, data, {
    "Content-Type": "multipart/formdata",
  });
const createRule = (data) =>
  postRequest(`${REACT_APP_API_URL}/api/v1/anti-fraud/create-rule`, data);
const createContentPage = (data) =>
  postRequest(`${REACT_APP_API_URL}/api/v1/pages`, data);
const updateSeoDetails = (data) =>
  postRequest(`${REACT_APP_API_URL}/api/v1/pages/seo`, data);
const addPageAsset = (data) =>
  postRequest(`${REACT_APP_API_URL}/api/v1/pages/asset`, data, {
    "Content-Type": "multipart/formdata",
  });
const createIP = (data) =>
  postRequest(`${REACT_APP_API_URL}/api/v1/allowed_ip`, data);
const checkManualLexisNexis = (data) =>
  postRequest(`${REACT_APP_API_URL}/api/v1/user/process-lexis-nexis`, data);
const createRewardSystemRequest = (data) =>
  postRequest(`${REACT_APP_API_URL}/api/v1/vip-tier`, data, {
    "Content-Type": "multipart/formdata",
  });
const createKycLabel = (data) =>
  postRequest(`${REACT_APP_API_URL}/api/v1/kyc/labels`, data);
const updateAllowedStates =  (data) => 
  postRequest(`${REACT_APP_API_URL}/api/v1/country/store-states`, data)

// Put Request
const updateMoney = (data) =>
  putRequest(`${REACT_APP_API_URL}/api/v1/admin/add-remove-balance`, data);
const updateVipTierLevel = (data) =>
  putRequest(`${REACT_APP_API_URL}/api/v1/user/vip-tier-details`, data);
const updateVerifyDocumentRequest = (data) =>
  putRequest(`${REACT_APP_API_URL}/api/v1/user/verify-document`, data);
const updateRequestDocumentRequest = (data) =>
  putRequest(`${REACT_APP_API_URL}/api/v1/user/request-document`, data);
const cancelDocumentRequest = (data) =>
  putRequest(`${REACT_APP_API_URL}/api/v1/user/cancel-document-request`, data);
const updatePackageRequest = (data) =>
  putRequest(`${REACT_APP_API_URL}/api/v1/package`, data, {
    "Content-Type": "multipart/formdata",
  });
const updateStatus = (data) =>
  putRequest(`${REACT_APP_API_URL}/api/v1/status/`, data);
const updateCms = (data) =>
  putRequest(`${REACT_APP_API_URL}/api/v1/cms/`, data);
const updateStaffAdmin = (data) =>
  putRequest(`${REACT_APP_API_URL}/api/v1/admin/`, data);
const updateProfile = (data) =>
  putRequest(`${REACT_APP_API_URL}/api/v1/admin/profile`, data);
const updateEmailTemplate = (data) =>
  putRequest(`${REACT_APP_API_URL}/api/v1/email/`, data);
const updateCreds = (data) =>
  putRequest(`${REACT_APP_API_URL}/api/v1/email/credentials`, data);
const updateConfig = (data) =>
  putRequest(`${REACT_APP_API_URL}/api/v1/admin/site-config`, data, {
    "Content-Type": "multipart/formdata",
  });
const updateDepositConfig = (data) =>
  putRequest(`${REACT_APP_API_URL}/api/v1/admin/deposit-config`, data);
const updateCasinoProvider = (data) =>
  putRequest(`${REACT_APP_API_URL}/api/v1/casino/providers`, data, {
    "Content-Type": "multipart/formdata",
  });
const updateBanner = (data) =>
  putRequest(`${REACT_APP_API_URL}/api/v1/banner`, data, {
    "Content-Type": "multipart/formdata",
  });
const updatePopup = (data) =>
  putRequest(`${REACT_APP_API_URL}/api/v1/popup`, data, {
    "Content-Type": "multipart/formdata",
  });
const updateCasinoCategory = (data) =>
  putRequest(`${REACT_APP_API_URL}/api/v1/casino/category`, data);
const reorderCasinoCategory = (data) =>
  putRequest(`${REACT_APP_API_URL}/api/v1/casino/category/order`, data);
const updateCasinoSubCategory = (data) =>
  putRequest(`${REACT_APP_API_URL}/api/v1/casino/subcategory`, data, {
    "Content-Type": "multipart/formdata",
  });
const updateRestrictedCountries = (data) =>
  putRequest(`${REACT_APP_API_URL}/api/v1/country/restricted/items`, data);
const reorderCasinoSubCategory = (data) =>
  putRequest(`${REACT_APP_API_URL}/api/v1/casino/subcategory/order`, data);
const updateCasinoGame = (data) =>
  putRequest(`${REACT_APP_API_URL}/api/v1/casino/game`, data, {
    "Content-Type": "multipart/formdata",
  });
const reorderCasinoSubCategoryGames = (data) =>
  putRequest(`${REACT_APP_API_URL}/api/v1/casino/games/order`, data);
const updateRestrictedItems = (data) =>
  putRequest(`${REACT_APP_API_URL}/api/v1/country/restricted`, data);
const updateManualTemplate = (data) =>
  putRequest(`${REACT_APP_API_URL}/api/v1/email/template`, data);
const updateBonus = (data) =>
  putRequest(`${REACT_APP_API_URL}/api/v1/bonus/`, data, {
    "Content-Type": "multipart/formdata",
  });
const updateBonusStatus = (data) =>
  putRequest(`${REACT_APP_API_URL}/api/v1/status`, data);
const updateWithdrawRequest = (data) =>
  putRequest(`${REACT_APP_API_URL}/api/v1/payment/redeem-requests`, data);
const reorderPackages = (data) =>
  putRequest(`${REACT_APP_API_URL}/api/v1/package/order`, data);
const updateUserStatus = (data) =>
  putRequest(`${REACT_APP_API_URL}/api/v1/user/update-user-status`, data);
const updateRemovePwLock = (data) =>
  putRequest(`${REACT_APP_API_URL}/api/v1/user/remove-pw-lock`, data);
const updateSocialSecurity = (data) =>
  putRequest(`${REACT_APP_API_URL}/api/v1/user/update-ssn`, data);
const addPlayerBankDetail = (data) =>
  putRequest(`${REACT_APP_API_URL}/api/v1/user/bank-details`, data);
const updatePlayerInfo = (data) =>
  putRequest(`${REACT_APP_API_URL}/api/v1/user/update-user`, data);
const addFavActivityLog = (data) =>
  putRequest(`${REACT_APP_API_URL}/api/v1/user/favorite-log`, data);
const updatePlayerPwd = (data) =>
  putRequest(`${REACT_APP_API_URL}/api/v1/user/update-password`, data);
const playerForceLogout = (data) =>
  putRequest(`${REACT_APP_API_URL}/api/v1/user/force-logout`, data);
const uploadUserDocs = (data) =>
  putRequest(`${REACT_APP_API_URL}/api/v1/user/document`, data, {
    "Content-Type": "multipart/formdata",
  });
const resolveTicket = (data) =>
  putRequest(`${REACT_APP_API_URL}/api/v1/alert/user-tickets`, data);
const updateRuleStatus = (data) =>
  putRequest(`${REACT_APP_API_URL}/api/v1/anti-fraud/update-rules`, data);
const updateContentPage = (data) =>
  putRequest(`${REACT_APP_API_URL}/api/v1/pages`, data);
const updatePageAsset = (data) =>
  putRequest(`${REACT_APP_API_URL}/api/v1/pages/asset`, data, {
    "Content-Type": "multipart/formdata",
  });
const paymentRefund = (data) =>
  putRequest(`${REACT_APP_API_URL}/api/v1/payment/refund`, data);
const updateUSerKYC = (data) =>
  putRequest(`${REACT_APP_API_URL}/api/v1/user/user-kyc`, data);
const updateRewardSystemRequest = (data) =>
  putRequest(`${REACT_APP_API_URL}/api/v1/vip-tier`, data, {
    "Content-Type": "multipart/formdata",
  });
const updateRewardSystemStatus = (data) =>
  putRequest(`${REACT_APP_API_URL}/api/v1/vip-tier/status`, data);
const updatePackageStatus = (data) =>
  putRequest(`${REACT_APP_API_URL}/api/v1/package/status`, data);
const removeLimits = (data) =>
  putRequest(
    `${REACT_APP_API_URL}/api/v1/user/remove-responsible-gambling`,
    data
  );
const updateSpinWheelConfiguration = (data) =>
  putRequest(`${REACT_APP_API_URL}/api/v1/spinWheelConfiguration`, data);
const updateAggregatorsStatus = (data) =>
  putRequest(`${REACT_APP_API_URL}/api/v1/casino/aggregator/`, data);
const updateKycLabel = (data) =>
  putRequest(`${REACT_APP_API_URL}/api/v1/kyc/labels`, data);
const updateKycCheck = (data) =>
  putRequest(`${REACT_APP_API_URL}/api/v1/kyc/update-kyc-check`, data);

// Delete Request
const deleteImage = (data) =>
  deleteRequest(`${REACT_APP_API_URL}/api/v1/gallery`, data);
const deleteCasinoCategory = (data) =>
  deleteRequest(`${REACT_APP_API_URL}/api/v1/casino/category`, data);
const deleteCasinoSubCategory = (data) =>
  deleteRequest(`${REACT_APP_API_URL}/api/v1/casino/subcategory`, data);
const deleteRestrictedCountries = (data) =>
  deleteRequest(`${REACT_APP_API_URL}/api/v1/country/restricted`, data);
const deleteCasinoGame = (data) =>
  deleteRequest(`${REACT_APP_API_URL}/api/v1/casino/game`, data);
const deleteRestrictedItem = (data) =>
  deleteRequest(`${REACT_APP_API_URL}/api/v1/country/restricted/items`, data);
const deleteBonus = (params) =>
  deleteParamsRequest(`${REACT_APP_API_URL}/api/v1/bonus/`, params);
const deleteCms = (data) =>
  deleteRequest(`${REACT_APP_API_URL}/api/v1/cms/pages`, data);
const deleteProvider = (data) =>
  deleteRequest(`${REACT_APP_API_URL}/api/v1/casino/providers`, data);
const deleteStaff = (data) =>
  deleteRequest(`${REACT_APP_API_URL}/api/v1/admin`, data);
const deleteEmailTemplete = (data) =>
  deleteRequest(`${REACT_APP_API_URL}/api/v1/email`, data);
const deleteBanner = (data) =>
  deleteRequest(`${REACT_APP_API_URL}/api/v1/banner`, data);
const deletePopup = (data) =>
  deleteRequest(`${REACT_APP_API_URL}/api/v1/popup`, data);
const deleteContentPage = (data) =>
  deleteRequest(`${REACT_APP_API_URL}/api/v1/pages`, data);
const deleteAsset = (data) =>
  deleteRequest(`${REACT_APP_API_URL}/api/v1/pages/asset`, data);
const deleteIP = (data) =>
  deleteRequest(`${REACT_APP_API_URL}/api/v1/allowed_ip`, data);
const deleteRewardSystem = (data) =>
  deleteRequest(`${REACT_APP_API_URL}/api/v1/vip-tier`, data);


// new

const getProductList = (params) => getRequest(`${REACT_APP_API_URL}/api/v1/products`, params);
const getStockList = (params) => getRequest(`${REACT_APP_API_URL}/api/v1/stocks`, params);
const createProduct = (data) => postRequest(`${REACT_APP_API_URL}/api/v1/products`, data)
const updateProduct = (data) => putRequest(`${REACT_APP_API_URL}/api/v1/products`, data)
const updateStock = (data) => putRequest(`${REACT_APP_API_URL}/api/v1/stocks`, data);
const getProductDetails = (data) => getRequest(`${REACT_APP_API_URL}/api/v1/products/getSingleProduct`, data)
const getLogs = (data) => getRequest(`${REACT_APP_API_URL}/api/v1/stocks/logs`, data)

export {
  adminLogin,
  getLiveUsersCount,
  adminLogout,
  updateProfile,
  getSiteConfig,
  updateConfig,
  updateDepositConfig,
  getAdminChildren,
  adminRoles,
  getAllAdmins,
  getAllPlayers,
  getAdminDetails,
  getPlayerById,
  setDailyLimits,
  getCountries,
  setDepositLimits,
  setLossLimits,
  updateCreds,
  setSessionTime,
  setDisableUntil,
  updateMoney,
  getUserDocumentsRequest,
  updateVerifyDocumentRequest,
  updateRequestDocumentRequest,
  cancelDocumentRequest,
  getPackagesListingRequest,
  createPackageRequest,
  updatePackageRequest,
  getAllCms,
  createCms,
  updateCms,
  getCmsDetail,
  getCmsDynamicData,
  getGallery,
  deleteImage,
  updateStatus,
  getStaffGroups,
  createStaffAdmin,
  updateStaffAdmin,
  getEmailTemplates,
  getEmailTemplateDetail,
  getEmailDynamicData,
  updateEmailTemplate,
  testEmailTemplate,
  getAllCasinoProviders,
  createCasinoProvider,
  updateCasinoProvider,
  getAllBanners,
  createBanner,
  updateBanner,
  getAllCasinoCategories,
  createCasinoCategory,
  updateCasinoCategory,
  deleteCasinoCategory,
  reorderCasinoCategory,
  getAllCasinoSubCategories,
  createCasinoSubCategory,
  updateCasinoSubCategory,
  deleteCasinoSubCategory,
  reorderCasinoSubCategory,
  getAllCasinoGames,
  deleteCasinoGame,
  updateCasinoGame,
  addGamestoSubCategory,
  getRestrictedCountries,
  getUnrestrictedCountries,
  updateRestrictedCountries,
  deleteRestrictedCountries,
  getCasinoSubcategoryGames,
  reorderCasinoSubCategoryGames,
  getRestrictedItems,
  getUnRestrictedItems,
  deleteRestrictedItem,
  updateRestrictedItems,
  getEmailCategoryData,
  createEmailTemplate,
  getDynamicEmailKeyData,
  updateManualTemplate,
  uploadrubyPlayGames,
  createBonus,
  getBonusData,
  getBonusDetail,
  updateBonus,
  updateBonusStatus,
  deleteBonus,
  deleteCms,
  deleteProvider,
  deleteStaff,
  deleteEmailTemplete,
  deleteBanner,
  getAllTransactions,
  getBankingTransactions,
  getWithdrawRequests,
  updateWithdrawRequest,
  reorderPackages,
  getReports,
  getReportsAll,
  getGameReport,
  elasticCheck,
  createDailyBonus,
  getPackagesTypesRequest,
  updateUserStatus,
  getSessionLogs,
  getAuditLogs,
  getRSGList,
  getStateListing,
  getCityListing,
  getPlayerResponsible,
  updateResponsibleStatus,
  getPlayerBankRequest,
  addPlayerBankDetail,
  updatePlayerInfo,
  getPlayerCasinoRequest,
  addFavActivityLog,
  getCommsLogs,
  getActivityTable,
  updatePlayerPwd,
  updateRemovePwLock,
  updateSocialSecurity,
  addComments,
  playerForceLogout,
  uploadUserDocs,
  getUserTickets,
  assignTicket,
  resolveTicket,
  getAgents,
  getRules,
  verifyOtp,
  generate2FA,
  verify2FA,
  disable2FA,
  getPlayerGroups,
  createPlayerGroup,
  createRule,
  updateRuleStatus,
  getAdminsForAlert,
  getContentPages,
  createContentPage,
  updateContentPage,
  deleteContentPage,
  getContentPageDetails,
  updateSeoDetails,
  addPageAsset,
  updatePageAsset,
  deleteAsset,
  getIps,
  createIP,
  deleteIP,
  paymentRefund,
  getKYCHistory,
  updateUSerKYC,
  checkManualLexisNexis,
  createRewardSystemRequest,
  updateRewardSystemStatus,
  getVipTierListing,
  updateVipTierLevel,
  getRewardSystemListing,
  updateRewardSystemRequest,
  getRewardSystemDetail,
  deleteRewardSystem,
  updatePackageStatus,
  removeLimits,
  getPaymentProviderList,
  getAllPopup,
  createPopup,
  updatePopup,
  deletePopup,
  getSpinWheelConfiguration,
  updateSpinWheelConfiguration,
  getCasinoAggregators,
  updateAggregatorsStatus,
  getRedeemNotification,
  getKycLabels,
  updateKycLabel,
  createKycLabel,
  getPendingKycList,
  getKycCheck,
  updateKycCheck,
  updateAllowedStates,
  getAllowedStateListing,
  getProductList,
  getStockList,
  createProduct,
  updateProduct,
  updateStock,
  getProductDetails,
  getLogs
};
