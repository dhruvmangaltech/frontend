import {
  faCommentAlt,
  faImage,
  faListAlt,
  faUserCircle,
} from "@fortawesome/free-regular-svg-icons";
import {
  faChartPie,
  faCompass,
  faGamepad,
  faMoneyCheckDollar,
  faDollarSign,
  faList12,
  faPeopleGroup,
  faPhotoVideo,
  faShieldAlt,
  faShippingFast,
  faStream,
  faUserAlt,
  faUsers,
  faAward,
  faCreditCard,
  faMoneyBillWave,
  faFileCsv,
  faBell,
  faPager,
  faFileInvoice,
  faArrowsSpin,
  faFileInvoiceDollar,
  faListCheck,
  faSackDollar,
} from "@fortawesome/free-solid-svg-icons";
import { AdminRoutes } from "../routes";

export const navItems = [
  {
    titleKey: "dashboard",
    link: AdminRoutes.Dashboard,
    icon: faChartPie,
    permissionLabel: "Report",
    inSidePermissionLabel: "DR",
  },
  {
    titleKey: "profile",
    link: AdminRoutes.Profile,
    icon: faUserAlt,
  },
  // {
  //   titleKey: 'emailTemplate',
  //   link: AdminRoutes.EmailTemplates,
  //   icon: faMailBulk,
  //   permissionLabel: 'EmailTemplate'
  // },
  {
    titleKey: "staff",
    link: AdminRoutes.Staff,
    icon: faPeopleGroup,
    permissionLabel: "Admins",
  },
  // {
  //   titleKey: "countries",
  //   link: AdminRoutes.Countries,
  //   icon: faCompass,
  //   permissionLabel: "Admins",
  // },
  {
    titleKey: "spinWheel",
    link: AdminRoutes.SpinWheel,
    icon: faArrowsSpin,
    permissionLabel: "SpinWheelConfiguration",
  },
  {
    titleKey: "players",
    link: AdminRoutes.Players,
    icon: faUsers,
    permissionLabel: "Users",
  },
  // {
  //   titleKey: "kycSettings",
  //   link: AdminRoutes.KYCSettings,
  //   icon: faListCheck,
  //   permissionLabel: "Users",
  // },
  // {
  //   titleKey: "paymentProviders",
  //   link: AdminRoutes.PaymentProviders,
  //   icon: faFileInvoiceDollar,
  //   permissionLabel: "Transactions",
  // },
  {
    titleKey: "casinoManagement",
    path: "casino-management",
    icon: faListAlt,
    permissionLabel: "CasinoManagement",
    isCollapsable: true,
    options: [
      {
        titleKey: "Aggregators",
        link: AdminRoutes.Aggregators,
        icon: faUserCircle,
        permissionLabel: "CasinoManagement",
      },
      {
        titleKey: "providers",
        link: AdminRoutes.CasinoProviders,
        icon: faUserCircle,
        permissionLabel: "CasinoManagement",
      },
      {
        titleKey: "categories",
        link: AdminRoutes.CasinoCategories,
        icon: faStream,
        permissionLabel: "CasinoManagement",
      },
      {
        titleKey: "subCategories",
        link: AdminRoutes.CasinoSubCategories,
        icon: faList12,
        permissionLabel: "CasinoManagement",
      },
      {
        titleKey: "games",
        link: AdminRoutes.CasinoGames,
        icon: faGamepad,
        permissionLabel: "CasinoManagement",
      }
      // {
      //   titleKey: "bannerManagement",
      //   link: AdminRoutes.BannerManagement,
      //   icon: faPhotoVideo,
      //   permissionLabel: "CasinoManagement",
      // },
      // {
      //   titleKey: "popupManagement",
      //   link: AdminRoutes.PopupManagement,
      //   icon: faChartPie,
      //   permissionLabel: "CasinoManagement",
      // },
    ],
  },
  {
    titleKey: "cashierManagement",
    link: AdminRoutes.CashierManagement,
    icon: faSackDollar,
    permissionLabel: "CashierManagement",
  },
  {
    titleKey: "transactions",
    path: "transactions",
    icon: faMoneyCheckDollar,
    permissionLabel: "Transactions",
    isCollapsable: true,
    options: [
      {
        titleKey: "transactionsBanking",
        link: AdminRoutes.BankingTransactions,
        icon: faDollarSign,
        permissionLabel: "Transactions",
      },
      {
        titleKey: "casinoTransactions",
        link: AdminRoutes.CasinoTransactions,
        icon: faCreditCard,
        permissionLabel: "Transactions",
      },
      {
        titleKey: "withdrawRequests",
        link: AdminRoutes.WithdrawRequest,
        icon: faMoneyBillWave,
        permissionLabel: "Transactions",
      },
    ],
  },
  {
    titleKey: "packages",
    link: AdminRoutes.Packages,
    icon: faShippingFast,
    permissionLabel: "Package",
  },
  {
    titleKey: "cms",
    path: "cms",
    icon: faCommentAlt,
    permissionLabel: "CMS",
    isCollapsable: true,
    options: [
      // {
      //   titleKey: 'pages',
      //   link: AdminRoutes.ContentPagesListing,
      //   icon: faPager,
      //   permissionLabel: 'CMS'
      // },
      {
        titleKey: "dynamicCms",
        link: AdminRoutes.CmsListing,
        icon: faShieldAlt,
        permissionLabel: "CMS",
      },
    ],
  },
  // {
  //   titleKey: 'cms',
  //   link: AdminRoutes.CmsListing,
  //   icon: faShieldAlt,
  //   permissionLabel: 'CMS'
  // },
  {
    titleKey: "rewardSystem",
    link: AdminRoutes.RewardSystem,
    icon: faAward,
    permissionLabel: "RewardSystem",
  },
  {
    titleKey: "bonus",
    link: AdminRoutes.BonusListing,
    icon: faAward,
    permissionLabel: "Bonus",
  },

  {
    titleKey: "imageGallery",
    link: AdminRoutes.ImageGallery,
    icon: faImage,
    permissionLabel: "ImageGallery",
  },
  {
    titleKey: "Products",
    // labelKey: "Geo-blocking",
    link: AdminRoutes.Products,
    icon: faImage,
    permissionLabel: "Products",
  },
  {
    titleKey: "Stocks",
    // labelKey: "Geo-blocking",
    link: AdminRoutes.Stocks,
    icon: faImage,
    permissionLabel: "Stocks",
  }
];
