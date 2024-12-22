export const reasonOptions = [
  "Image Not Visible Properly",
  "Not A Valid Document",
  "Document Validation Expired",
  "Add Custom Reason",
];

export const tableHeaders = [
  { label: "Id", value: "userBonusId" },
  { label: "Promotion Title", value: "promotionTitle" },
  { label: "Bonus Type", value: "bonusType" },
  { label: "Valid Till", value: "validTo" },
  { label: "Is Expired", value: "isExpired" },
  { label: "Status", value: "isActive" },
  { label: "Cancelled By", value: "cancelledBy" },
  { label: "Updated At", value: "updatedAt" },
  { label: "Action", value: "action" },
];

export const bonusStatus = [
  { label: "All", value: "" },
  { label: "Active", value: "ACTIVE" },
  { label: "Pending", value: "PENDING" },
  { label: "Cancelled", value: "CANCELLED" },
  { label: "Forfeited", value: "FORFEITED" },
  { label: "Expired", value: "EXPIRED" },
  { label: "Completed", value: "COMPLETED" },
];

export const bonusTypes = [
  { label: "All", value: "" },
  { label: "DEPOSIT", value: "deposit", id: 0 },
  { label: "JOINING", value: "joining", id: 1 },
  { label: "FREESPINS", value: "freespins", id: 2 },
];

export const kycStatusOption = [
  { label: "All", value: "ALL" },
  { label: "Init", value: "INIT" },
  { label: "Pending", value: "PENDING" },
  { label: "Completed", value: "COMPLETED" },
  { label: "On Hold", value: "ONHOLD" },
];

export const coinTypeOptions = [
  { label: "All", value: "all" },
  { label: "Gc", value: 0 },
  { label: "Sc", value: 1 },
];

export const actionTypeOptions = [
  { label: "All", value: "all" },
  { label: "Bet", value: "bet" },
  { label: "Win", value: "win" },
  { label: "Lost", value: "lost" },
  { label: "Bonus", value: "bonus" },
  // { label: 'Rollback', value: 'rollback' },
  // { label: 'Pre Rollback', value: 'rollbackbeforebetwin' },
];

export const statusOptions = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Completed", value: "completed" },
  { label: "Failed", value: "failed" },
  { label: "Rollback", value: "rollback" },
];

export const transactionTypeOptions = [
  { label: "All", value: "all" },
  { label: "Deposit", value: "deposit" },
  { label: "Redeem", value: "withdraw" },
  { label: "AddSc", value: "addSc" },
  { label: "AddGc", value: "addGc" },
];

export const statusTypeOptions = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Success", value: "success" },
  { label: "Failed", value: "failed" },
  { label: "Cancelled", value: "canceled" },
  { label: "In-process", value: "inprogress" },
  { label: "Void", value: "void" },
  { label: "Refunded", value: "refund" },
  { label: "Short", value: "short" },
];

export const activityTypeOptions = [
  { label: "Redemptions", value: "redemptions", id: 1 },
  { label: "Login", value: "login", id: 2 },
  { label: "Registered Data", value: "registeredData", id: 3 },
  { label: "Purchase", value: "purchase", id: 4 },
  { label: "Wins", value: "wins", id: 5 },
];

export const ruleActivityConstants = {
  1: "Redemptions",
  2: "Login",
  3: "Registered Data",
  4: "Purchase",
  5: "Wins",
};

export const criteriaOptions = [
  { label: "Country", value: "country" },
  { label: "Player Groups", value: "playerGroups" },
];

export const PlayersTabInfo = {
  editParent: {
    label: "Edit",
    key: "editParent",
    childLabel: [
      {
        label: "Ban/Unban",
        key: "isBan",
        type: 3,
      },
      {
        label: "Restrict",
        key: "isRestrict",
        type: 2,
      },
      {
        label: "Add/deduct coins",
        key: "addDeductCoinsChild",
      },
      // {
      //   label: "Vip Tier",
      //   key: "vipTierChild",
      // },
      // {
      //   label: "Paynote",
      //   key: "paynotePayment",
      //   type: 13,
      // },
      // {
      //   label: "Triple A",
      //   key: "tripleAPayment",
      //   type: 14,
      // },
      // {
      //   label: 'Bank Details',
      //   key: 'bankDetailsChild'
      // },
      //   {
      //     label: 'Tab',
      //     key: 'tabChild'
      //   },
      //   {
      //     label: 'Self-exclusion',
      //     key: 'selfExclusionChild'
      //   },
      {
        label: "Limits",
        key: "limitsChild",
      },
      {
        label: "Redemption email",
        key: "isRedemptionSubscribed",
        type: 5,
      },
      // {
      //   label: 'Subscribe',
      //   key: 'isSubscribed',
      //   type: 6
      // },
      // {
      //   label: 'Social Security',
      //   key: 'socialSecurityChild'
      // },
      {
        label: "Phone Verification",
        key: "phoneVerified",
        type: 1,
      },
      {
        label: "Password",
        key: "passwordChild",
      },
      {
        label: "Remove PW Lock",
        key: "removePwLock",
      },
      // {
      //   label: 'Free Spins',
      //   key: 'freeSpins'
      // },
      {
        label: "Demo account",
        key: "isInternalUser",
        type: 4,
      },
      {
        label: "Force Logout",
        key: "forceLogoutChild",
      },
    ],
  },
  verificationParent: {
    label: "Verification",
    key: "verificationParent",
  },
  activityParent: {
    label: "Transaction Activity",
    key: "activityParent",
  },
  // auditParent: {
  //   label: 'Audit',
  //   key: 'auditParent'
  // },
  // rsgParent: {
  //   label: 'RSG',
  //   key: 'rsgParent'
  // },
  // lexisNexisParent: {
  //   label: 'Lexis Nexis',
  //   key: 'lexisNexisParent'
  // },
  // logsParent: {
  //   label: 'Logs',
  //   key: 'logsParent'
  // },
  // commsParent: {
  //   label: 'Comms',
  //   key: 'commsParent'
  // }
};

export const auditTableHeaders = [
  "BO Username",
  "Field Changed",
  "Original Value",
  "Changed Value",
  "source",
  "Time",
  "Remark",
];
export const logsTableHeaders = [
  "Local Time",
  "CET Time",
  "Type",
  "IP Address",
];
export const commsTableHeaders = [
  "Id",
  "Communication Date",
  "Email Address",
  "Template Id",
  "Template Name",
  "Message Id",
  "Source",
  "Details",
];
export const PlayerConsentHeader = [
  "Type",
  "Version",
  "Date Published",
  "Status",
  "Date Accepted",
];
export const PlayerLimitHeader = [
  "Limit Type",
  "Value",
  "Frequency",
  "Set Date",
  "Active From",
  "Reset Date",
  "Cooling Period",
  "Status",
];
export const PlayerTABSEHeader = {
  TIME: [
    "Limit Type",
    "Time Break",
    "Frequency",
    "Set Date",
    "Active From",
    "Reset Date",
    "Cooling Period",
    "Status",
  ],
  TIME_BREAK: [
    "Set Date",
    "Active From",
    "Reset Date",
    "Cooling Period",
    "Status",
  ],
  SESSION: [
    "Set Date",
    "Active From",
    "Reset Date",
    "Cooling Period",
    "Status",
  ],
  SELF_EXCLUSION: [
    "Set Date",
    "Active From",
    "Reset Date",
    "Cooling Period",
    "Status",
  ],
};
export const activityTableHeader = [
  "Game Id",
  "Name",
  "Provider",
  "Start",
  "End",
  "Description",
  "Amount $",
  "SC",
  "GC",
  "Payment ID",
  "Date",
  "Coin Type",
  "Stake",
  "Win",
  "SC Before",
  "SC After",
  "GC Before",
  "GC After",
  "Details",
];

export const RSGStatus = {
  0: "In-Active",
  1: "Active",
  2: "Cooling Period",
};

export const RSGLimitType = {
  1: "Daily",
  2: "Weekly",
  3: "Monthly",
};

export const actionConstants = [
  { label: "All", value: "all" },
  { label: "Bonus", value: "bonus" },
  { label: "SC by Admin", value: "addSc" },
  { label: "GC by Admin", value: "addGc" },
  { label: "Purchase", value: "deposit" },
  { label: "Redeem", value: "redeem" },
  { label: "Welcome Bonus", value: "welcome bonus" },
  // { label: "Daily Bonus", value: "daily-bonus" },
  // { label: "First Purchase Bonus", value: "first-purchase-bonus" },
  // { label: "Referral Bonus", value: "referral-bonus" },
  // { label: "PSP Bonus", value: "psp-bonus" },
  // { label: "Default Daily Bonus", value: "default-bonus" },
  { label: "Lost ", value: "lost" },
  { label: "Bet", value: "bet" },
  { label: "Win", value: "win" },
];

export const statusConstants = [
  { label: "All", value: "all" },
  { label: "Success", value: "Success" },
  { label: "Pending", value: "Pending" },
  { label: "Failed", value: "Failed" },
  { label: "Cancelled", value: "Cancelled" },
  { label: "Declined", value: "Declined" },
  { label: "Void", value: "Void" },
  { label: "Refund", value: "Refund" },
];

export const transactionConstants = [
  { label: "All", value: "all" },
  { label: "Banking", value: "banking" },
  { label: "Casino", value: "casino" },
];

export const docsConstants = [
  { label: "Address Proof", value: "address" },
  { label: "Id Proof", value: "id" },
  { label: "Bank Statement", value: "bank_checking" },
  { label: "SSN Document", value: "ssn" },
  { label: "Other", value: "other" },
];

export const SIGN_UP_METHOD = {
  0: "Email",
  1: "Google",
  2: "Facebook",
};

export const VERIFFSTATUS = {
  APPROVED: "APPROVED",
  PENDING: "PENDING",
  REJECTED: "REJECTED",
  REQUESTED: "REQUESTED",
  RE_REQUESTED: "RE-REQUESTED",
  SUCCESS: "SUCCESS",
  CANCELLED: "CANCELED",
  COMPLETED: "COMPLETED",
};

export const kycConstants = [
  { label: "K1", value: "K1" },
  { label: "K2", value: "K2" },
  { label: "K3", value: "K3" },
  { label: "K4", value: "K4" },
];

export const paymentProviders = [
  { label: "All", value: "all" },
  // { label: "Triple A", value: "triple_a" },
  // { label: "Paynote", value: "paynote" },
];
