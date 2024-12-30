export const AdminRoutes = {
  // pages
  DefaultRoute: "/",
  AdminRoute: "/admin",
  AdminSignin: "/admin/signin",
  Dashboard: "/admin/dashboard",
  Profile: "/admin/profile",
  Players: "/admin/players",
  PaymentProviders: "/admin/payment-providers",
  Packages: "/admin/packages",
  CreatePackage: "/admin/create-package",
  ReorderPackage: "/admin/reorder-package",
  EditPackageDetails: "/admin/edit-package/:packageId",
  PlayerDetails: "/admin/player-details/:userId",
  CasinoProviders: "/admin/casino-management/casino-providers",
  CashierManagement: "/admin/cashier-management",
  Aggregators: "/admin/casino-management/Aggregators",
  RestrictedProviderCountries: "/admin/restrict-providers-countries/:itemId",
  BannerManagement: "/admin/casino-management/banner-management",
  PopupManagement: "/admin/casino-management/popup-management",
  CasinoCategories: "/admin/casino-management/casino-categories",
  ReorderCasinoCategories: "/admin/casino-management/reorder-categories",
  CasinoGames: "/admin/casino-management/casino-games",
  CasinoSubCategories: "/admin/casino-management/casino-sub-categories",
  ReorderCasinoSubCategories: "/admin/casino-management/reorder-sub-categories",
  AddSubCategoryGames: "/admin/add-games/:masterGameSubCategoryId",
  ReorderGames: "/admin/reorder-games",
  CmsListing: "/admin/cms",
  CmsDetails: "/admin/cms-details/:cmsPageId",
  CmsEdit: "/admin/edit-cms/:cmsPageId",
  CmsCreate: "/admin/create-cms/",
  ContentPagesListing: "/admin/cms/pages",
  ContentPageDetails: "/admin/content-page-details/:pageId",
  BonusListing: "/admin/bonus",
  BonusCreate: "/admin/create-bonus/",
  BonusEdit: "/admin/edit-bonus/:bonusId",
  BonusDetails: "/admin/bonus-details/:bonusId",
  ImageGallery: "/admin/image-gallery",
  Staff: "/admin/staff",
  Countries: "/admin/countries",
  SpinWheel: "/admin/spin-wheel",
  CountriesRestrictedProviders: "/admin/restricted-providers/:countryId",
  CountriesRestrictedGames: "/admin/restricted-games/:countryId",
  CreateAdmin: "/admin/create-admin",
  EditAdmin: "/admin/edit-admin/:adminId",
  AdminDetails: "/admin/admin-details/:adminId",
  EmailTemplates: "/admin/email-templates",
  CreateEmailTemplate: "/admin/create-email-template",
  EditManualTemplate: "/admin/edit-manual-template/:emailTemplateId",
  EditEmailTemplates: "/admin/edit-email-template/:emailTemplateId",
  CasinoTransactions: "/admin/casino-transactions",
  BankingTransactions: "/admin/transactions-banking",
  WithdrawRequest: "/admin/withdraw-transactions",
  RewardSystem: "/admin/reward-system",
  CreateRewardSystem: "/admin/create-reward-system",
  EditRewardSystem: "/admin/edit-reward-system/:vipTierId",
  NotFound: "/404",
  ServerError: "/500",
  KYCSettings: "/admin/kyc-settings",
  Stocks: "/admin/stocks",
  Products: "/admin/products",
  CreateProducts: "/admin/products/create",
  ProductDeatil: "/admin/products/:productId"
};
