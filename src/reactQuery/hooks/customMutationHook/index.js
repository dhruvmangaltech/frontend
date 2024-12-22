import { useMutation } from "@tanstack/react-query";
import {
  adminLogout,
  cancelDocumentRequest,
  createBanner,
  createCasinoCategory,
  createCasinoProvider,
  createCasinoSubCategory,
  createCms,
  createPackageRequest,
  createStaffAdmin,
  deleteCasinoCategory,
  deleteCasinoGame,
  deleteCasinoSubCategory,
  deleteImage,
  reorderCasinoCategory,
  reorderCasinoSubCategory,
  setDailyLimits,
  setDepositLimits,
  setDisableUntil,
  setLossLimits,
  setSessionTime,
  testEmailTemplate,
  updateBanner,
  updateCasinoCategory,
  updateCasinoGame,
  updateCasinoProvider,
  updateCasinoSubCategory,
  updateCms,
  updateConfig,
  updateCreds,
  updateEmailTemplate,
  updateMoney,
  updatePackageRequest,
  updateProfile,
  updateRequestDocumentRequest,
  updateStaffAdmin,
  updateStatus,
  updateVerifyDocumentRequest,
  reorderCasinoSubCategoryGames,
  addGamestoSubCategory,
  updateRestrictedCountries,
  deleteRestrictedCountries,
  deleteRestrictedItem,
  updateRestrictedItems,
  uploadrubyPlayGames,
  createEmailTemplate,
  updateManualTemplate,
  createBonus,
  updateBonus,
  updateBonusStatus,
  deleteBonus,
  deleteCms,
  deleteProvider,
  deleteStaff,
  deleteEmailTemplete,
  deleteBanner,
  updateWithdrawRequest,
  reorderPackages,
  createDailyBonus,
  updateUserStatus,
  updateResponsibleStatus,
  addPlayerBankDetail,
  updatePlayerInfo,
  addFavActivityLog,
  updatePlayerPwd,
  updateRemovePwLock,
  updateSocialSecurity,
  addComments,
  uploadUserDocs,
  playerForceLogout,
  assignTicket,
  verifyOtp,
  verify2FA,
  disable2FA,
  createPlayerGroup,
  updateRuleStatus,
  createContentPage,
  updateContentPage,
  deleteContentPage,
  updateSeoDetails,
  addPageAsset,
  updatePageAsset,
  deleteAsset,
  paymentRefund,
  updateUSerKYC,
  getActivityTable,
  checkManualLexisNexis,
  createRewardSystemRequest,
  updateRewardSystemRequest,
  deleteRewardSystem,
  updateRewardSystemStatus,
  updatePackageStatus,
  updateVipTierLevel,
  removeLimits,
  createPopup,
  updatePopup,
  deletePopup,
  updateSpinWheelConfiguration,
  updateAggregatorsStatus,
  updateKycLabel,
  createKycLabel,
  updateKycCheck,
  updateDepositConfig,
  updateAllowedStates,
} from "../../../utils/apiCalls";
import { toast } from "../../../components/Toast";
// import { crashGameCancelBetUrl, crashGameEscapeBetUrl, crashGamePlaceBetUrl, updateUnseenCountUrl, loginUrl } from '../../axios/urls'

// Add Daily Limits mutations hook
const setDailyLimitsMutation = ({ body }) => setDailyLimits(body);

export const errorHandler = (err) => {
  if (err?.response?.data?.errors.length > 0) {
    const { errors } = err.response.data;
    errors.map((error) => {
      if (error?.description) {
        toast(error?.description, "error");
      }
    });
  }
};

export const useSetDailyLimitsMutation = () => {
  return useMutation({
    mutationFn: setDailyLimitsMutation,
    retry: 0,
  });
};

// Add Deposit limits custom mutations hook
const setDepositLimitsMutation = ({ body }) => setDepositLimits(body);

export const useSetDepositLimitsMutation = () => {
  return useMutation({
    mutationFn: setDepositLimitsMutation,
    retry: 0,
  });
};

// Add Loss Limits custom mutations hook
const setLossLimitsMutation = ({ body }) => setLossLimits(body);

export const useSetLossLimitsMutation = () => {
  return useMutation({
    mutationFn: setLossLimitsMutation,
    retry: 0,
  });
};

// Add Session time custom mutations hook
const setSessionTimeMutation = ({ body }) => setSessionTime(body);

export const useSetSessionTimeMutation = () => {
  return useMutation({
    mutationFn: setSessionTimeMutation,
    retry: 0,
  });
};

// Add Disable until custom mutations hook
const setDisableUntilMutation = ({ body }) => {
  return setDisableUntil(body);
};

export const useDisableUntilMutation = () => {
  return useMutation({
    mutationFn: setDisableUntilMutation,
    retry: 0,
  });
};

// Add Disable until custom mutations hook
const updateMoneyMutation = ({ body }) => {
  return updateMoney(body);
};

export const useUpdateMoneyMutation = () => {
  return useMutation({
    mutationFn: updateMoneyMutation,
    retry: 0,
  });
};

// Add Disable until custom mutations hook
const updateVerifyDocumentMutation = (body) => {
  return updateVerifyDocumentRequest(body);
};

export const useUpdateVerifyDocumentMutation = () => {
  return useMutation({
    mutationFn: updateVerifyDocumentMutation,
    retry: 0,
  });
};
// Add Disable until custom mutations hook
const updateRequestDocumentMutation = (body) => {
  return updateRequestDocumentRequest(body);
};

export const useUpdateRequestDocumentMutation = () => {
  return useMutation({
    mutationFn: updateRequestDocumentMutation,
    retry: 0,
  });
};
// Add Disable until custom mutations hook
const cancelDocumentMutation = (body) => {
  return cancelDocumentRequest(body);
};

export const useCancelDocumentMutation = () => {
  return useMutation({
    mutationFn: cancelDocumentMutation,
    retry: 0,
  });
};

// Create package custom mutations hook
const createPackageMutation = (body) => {
  return createPackageRequest(body);
};

export const useCreatePackageMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: createPackageMutation,
    retry: 0,
    onSuccess,
    onError,
  });
};

// Update package custom mutations hook
const updatePackageMutation = (body) => {
  return updatePackageRequest(body);
};

export const useUpdatePackageMutation = ({ onSuccess }) => {
  return useMutation({
    mutationFn: updatePackageMutation,
    retry: 0,
    onSuccess,
  });
};

export const useUpdatePackageStatusMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: updatePackageStatus,
    onSuccess,
    onError,
  });
};

// Update reward system custom mutations hook
const updateRewardSystemMutation = (body) => {
  return updateRewardSystemRequest(body);
};
export const useUpdateRewardSystemMutation = ({ onSuccess }) => {
  return useMutation({
    mutationFn: updateRewardSystemMutation,
    retry: 0,
    onSuccess,
  });
};

export const useReorderPackageMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: reorderPackages,
    onSuccess,
    onError: (error) => errorHandler(error),
  });
};

export const useUpdateStatusMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: updateStatus,
    onSuccess,
    onError,
  });
};

export const useUpdateRewardSystemStatusMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: updateRewardSystemStatus,
    onSuccess,
    onError,
  });
};
export const useCreateDailyBonusMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: createDailyBonus,
    onSuccess,
    onError: (error) => errorHandler(error),
  });
};

export const useCreateBonusMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: createBonus,
    onSuccess,
    onError: (error) => errorHandler(error),
  });
};

export const useUpdateBonusMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: updateBonus,
    onSuccess,
    onError: (error) => errorHandler(error),
  });
};

export const useUpdateBonusStatusMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: updateBonusStatus,
    onSuccess,
    onError,
  });
};

export const useDeleteBonus = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: (data) => deleteBonus(data),
    onSuccess,
    onError: (error) => errorHandler(error),
  });
};

export const useCreateCMSMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: createCms,
    onSuccess,
    onError: (error) => errorHandler(error),
  });
};

export const useCreateEmailTemplateMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: createEmailTemplate,
    onSuccess,
    onError: (error) => errorHandler(error),
  });
};

export const useUpdateCMSMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: updateCms,
    onSuccess,
    onError: (error) => errorHandler(error),
  });
};

export const useDeleteCms = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: (data) => deleteCms(data),
    onSuccess,
    onError: (error) => errorHandler(error),
  });
};

export const useUpdateManualTemplateMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: updateManualTemplate,
    onSuccess,
    onError: (error) => errorHandler(error),
  });
};

export const useDeleteGalleryImage = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: (data) => deleteImage(data),
    onSuccess,
    onError: (error) => errorHandler(error),
  });
};

export const useLogoutUser = ({ onSuccess }) => {
  return useMutation({
    mutationFn: adminLogout,
    retry: 0,
    onSuccess,
  });
};

export const useCreateStaffAdminMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: (data) => createStaffAdmin(data),
    retry: 0,
    onSuccess,
    onError: (error) => errorHandler(error),
  });
};

export const useUpdateStaffMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: (data) => updateStaffAdmin(data),
    onSuccess,
    onError: (error) => errorHandler(error),
  });
};

export const useDeleteStaff = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: (data) => deleteStaff(data),
    onSuccess,
    onError,
  });
};

export const useUpdateProfileMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: (data) => updateProfile(data),
    onSuccess,
    onError,
  });
};

export const useUpdateEmailTemplateMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: (data) => updateEmailTemplate(data),
    onSuccess,
    onError: (error) => errorHandler(error),
  });
};

export const useTestEmailTemplateMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: (data) => testEmailTemplate(data),
    onSuccess,
    onError: (error) => errorHandler(error),
  });
};

export const useDeleteEmailTemplete = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: (data) => deleteEmailTemplete(data),
    onSuccess,
    onError: (error) => errorHandler(error),
  });
};

export const useUpdateConfigMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: (data) => updateConfig(data),
    onSuccess,
    onError: (error) => errorHandler(error),
  });
};

export const useUpdateDepositConfigMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: (data) => updateDepositConfig(data),
    onSuccess,
    onError: (error) => errorHandler(error),
  });
};

export const useUpdateCredsMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: (data) => updateCreds(data),
    onSuccess,
    onError: (error) => errorHandler(error),
  });
};

export const useCreateCasinoProvidersMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: createCasinoProvider,
    onSuccess,
    onError: (error) => errorHandler(error),
  });
};

export const useUpdateCasinoProvidersMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: updateCasinoProvider,
    onSuccess,
    onError: (error) => errorHandler(error),
  });
};

export const useUpdateSpinWheelMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: updateSpinWheelConfiguration,
    onSuccess,
    onError: (error) => errorHandler(error),
  });
};

export const useDeleteProvider = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: (data) => deleteProvider(data),
    onSuccess,
    onError: (error) => errorHandler(error),
  });
};

export const useCreateBannerMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: createBanner,
    onSuccess,
    onError,
  });
};

export const useCreatePopupMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: createPopup,
    onSuccess,
    onError,
  });
};

export const useUpdateBannerMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: updateBanner,
    onSuccess,
    onError,
  });
};

export const useUpdatePopupMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: updatePopup,
    onSuccess,
    onError,
  });
};

export const useDeleteBanner = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: (data) => deleteBanner(data),
    onSuccess,
    onError: (error) => errorHandler(error),
  });
};

export const useDeletePopup = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: (data) => deletePopup(data),
    onSuccess,
    onError: (error) => errorHandler(error),
  });
};

export const useDeleteCasinoCategory = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: (data) => deleteCasinoCategory(data),
    onSuccess,
    onError: (error) => errorHandler(error),
  });
};

export const useDeleteCasinoGame = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: (data) => deleteCasinoGame(data),
    onSuccess,
    onError: (error) => errorHandler(error),
  });
};

export const useDeleteRestrictedItem = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: (data) => deleteRestrictedItem(data),
    onSuccess,
    onError: (error) => errorHandler(error),
  });
};

export const useUpdateCasinoGame = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: updateCasinoGame,
    onSuccess,
    onError: (error) => errorHandler(error),
  });
};

export const useCreateCasinoCategoryMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: createCasinoCategory,
    onSuccess,
    onError,
  });
};

export const useUpdateCasinoCategoryMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: updateCasinoCategory,
    onSuccess,
    onError,
  });
};

export const useReorderCasinoCategoriesMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: reorderCasinoCategory,
    onSuccess,
    onError: (error) => errorHandler(error),
  });
};

export const useDeleteCasinoSubCategory = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: (data) => deleteCasinoSubCategory(data),
    onSuccess,
    onError,
  });
};

export const useDeleteRewardSystem = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: (data) => deleteRewardSystem(data),
    onSuccess,
    onError,
  });
};

export const useCreateCasinoSubCategoryMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: createCasinoSubCategory,
    onSuccess,
    onError: (error) => errorHandler(error),
  });
};

export const useUpdateCasinoSubCategoryMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: updateCasinoSubCategory,
    onSuccess,
    onError: (error) => errorHandler(error),
  });
};

export const useReorderCasinoSubCategoriesMutation = ({
  onSuccess,
  onError,
}) => {
  return useMutation({
    mutationFn: reorderCasinoSubCategory,
    onSuccess,
    onError: (error) => errorHandler(error),
  });
};

export const useAddGamesToSubCategory = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: addGamestoSubCategory,
    onSuccess,
    onError: (error) => errorHandler(error),
  });
};

export const useAddRestrictedCountries = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: updateRestrictedCountries,
    onSuccess,
    onError: (error) => errorHandler(error),
  });
};

export const useDeleteRestrictedCountries = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: deleteRestrictedCountries,
    onSuccess,
    onError: (error) => errorHandler(error),
  });
};
export const useReorderSubCategoryGamesMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: reorderCasinoSubCategoryGames,
    onSuccess,
    onError: (error) => errorHandler(error),
  });
};

export const useUpdateRestrictedItemMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: updateRestrictedItems,
    onSuccess,
    onError: (error) => errorHandler(error),
  });
};

export const useUploadGamesMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: uploadrubyPlayGames,
    onSuccess,
    onError,
  });
};

export const useUpdateWithdrawRequestMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: updateWithdrawRequest,
    onSuccess,
    onError,
  });
};

export const useUpdateUserStatus = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: updateUserStatus,
    onSuccess,
    onError,
  });
};

export const useUpdateResponsibleMutuation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: updateResponsibleStatus,
    onSuccess,
    onError,
  });
};

export const usePlayerBankMutuation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: addPlayerBankDetail,
    onSuccess,
    onError,
  });
};

export const useUpdatePlayerInfo = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: updatePlayerInfo,
    onSuccess,
    onError,
  });
};

export const addUpdateActivityLog = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: addFavActivityLog,
    onSuccess,
    onError: (error) => errorHandler(error),
  });
};

export const updatePlayerPassword = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: updatePlayerPwd,
    onSuccess,
    onError,
  });
};

// Add/deduct money
export const updateCoinMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: updateMoney,
    onSuccess,
    onError,
  });
};

// Add/deduct money
export const updateVipTierLevelMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: updateVipTierLevel,
    onSuccess,
    onError,
  });
};
export const useUpdateRemovePwLock = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: updateRemovePwLock,
    onSuccess,
    onError,
  });
};

export const useUpdateSocialSecurity = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: updateSocialSecurity,
    onSuccess,
    onError,
  });
};

export const useAddComments = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: addComments,
    onSuccess,
    onError,
  });
};

export const useAssignTicket = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: assignTicket,
    onSuccess,
    onError: (error) => errorHandler(error),
  });
};

// Player Force logout
export const updatePlayerForceLogout = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: playerForceLogout,
    onSuccess,
    onError,
  });
};

export const useUploadUserDocumetMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: uploadUserDocs,
    onSuccess,
    onError,
  });
};

export const verifyOtpMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: (data) => verifyOtp(data),
    onSuccess,
    onError,
  });
};

export const verify2FAMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationKey: ["verify2FA"],
    mutationFn: (data) => verify2FA(data),
    onSuccess,
    onError,
  });
};

export const disable2FAMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationKey: ["disable2FAMutation"],
    mutationFn: (data) => disable2FA(data),
    onSuccess,
    onError,
  });
};

export const useUpdateRuleMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: updateRuleStatus,
    onSuccess,
    onError: (error) => errorHandler(error),
  });
};

export const useCreateContentPageMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: createContentPage,
    onSuccess,
    onError,
  });
};

export const useUpdateContentPageMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: updateContentPage,
    onSuccess,
    onError,
  });
};

export const useDeleteContentPage = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: (data) => deleteContentPage(data),
    onSuccess,
    onError: (error) => errorHandler(error),
  });
};

export const useUpdateSEODetailsMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: updateSeoDetails,
    onSuccess,
    onError: (error) => errorHandler(error),
  });
};

export const useAddAssetMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: addPageAsset,
    onSuccess,
    onError,
  });
};

export const useUpdateAssetMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: updatePageAsset,
    onSuccess,
    onError,
  });
};

export const useDeleteAsset = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: (data) => deleteAsset(data),
    onSuccess,
    onError: (error) => errorHandler(error),
  });
};

export const usePaymentRefundMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: paymentRefund,
    onSuccess,
    onError,
  });
};

export const useUpdateUserKYCMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: updateUSerKYC,
    onSuccess,
    onError: (error) => errorHandler(error),
  });
};

export const useDownloadActivityCsvMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationKey: ["downloadActivityCsv"],
    mutationFn: (params) => getActivityTable(params),
    onSuccess,
    onError,
  });
};

export const useCheckLexisNexisMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: (data) => checkManualLexisNexis(data),
    onSuccess,
    onError,
  });
};
// Create package custom mutations hook
const createRewardSystemMutation = (body) => {
  return createRewardSystemRequest(body);
};
export const useCreateRewardSystemMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: createRewardSystemMutation,
    retry: 0,
    onSuccess,
    onError,
  });
};

// Remove limits
const removeLimitsMutation = (body) => removeLimits(body);

export const useRemoveLimitsMutation = () => {
  return useMutation({
    mutationFn: removeLimitsMutation,
    retry: 0,
  });
};

// // get Reward System Listing custom query hook
// const getRewardSystemDetailsMutation = (body) => {
//   return getRewardSystemDetail(body)
// }

// export const useGetRewardSystemDetailMutation = ({ onSuccess, onError }) => {
//   return useMutation({
//     mutationFn: getRewardSystemDetailsMutation,
//     retry: 0,
//     onSuccess,
//     onError
//   })
// }

export const useUpdateAggregatorsStatusMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: updateAggregatorsStatus,
    onSuccess,
    onError,
  });
};

export const useCreateKycLabelMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: createKycLabel,
    onSuccess,
    onError,
  });
};

export const useUpdateKycLabelMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: updateKycLabel,
    onSuccess,
    onError,
  });
};

export const useUpdateKycCheck = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: updateKycCheck,
    onSuccess,
    onError,
  });
};

export const useUpdateAllowedStates = ({onSuccess, onError}) => {
  return useMutation ({
    mutationFn: updateAllowedStates,
    onSuccess,
    onError
  })
}