export const kycLabelTableHeaders = [
  { labelKey: "headers.id", value: "id" },
  // { labelKey: "headers.label", value: "label" },
  { labelKey: "headers.name", value: "name" },
  { labelKey: "headers.required", value: "required" },

  { labelKey: "headers.isActive", value: "isActive" },
  { labelKey: "headers.action", value: "" },
];

export const requestedKycsTableHeaders = [
  { labelKey: "requestedKycsTableHeaders.userId", value: "userId" },
  { labelKey: "requestedKycsTableHeaders.firstName", value: "firstName" },
  { labelKey: "requestedKycsTableHeaders.lastName", value: "lastName" },
  { labelKey: "requestedKycsTableHeaders.username", value: "username" },
  { labelKey: "requestedKycsTableHeaders.action", value: "" },
];

export const kycFlowsTableHeaders = [
  { labelKey: "key", value: "key" },
  { labelKey: "name", value: "name" },
  { labelKey: "required", value: "Is KYC Required" },
  { labelKey: "action", value: "" },
];

export const kycFlows = [
  {
    name: "Deposit",
    key: "isDepositAllow",
  },

  {
    name: "Game-play",
    key: "isGameAllow",
  },
  {
    name: "Withdrawal",
    key: "isWithdrawalAllow",
  },
];
