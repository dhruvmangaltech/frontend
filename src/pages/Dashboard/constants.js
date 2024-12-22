export const dateOptions = [
    { labelKey: 'filter.date.today', value: 'today' },
    { labelKey: 'filter.date.yesterday', value: 'yesterday' },
    { labelKey: 'filter.date.monthtodate', value: 'monthtodate' },
    { labelKey: 'filter.date.custom', value: 'custom' },
    { labelKey: 'filter.date.last7days', value: 'last7days' },
    { labelKey: 'filter.date.last30days', value: 'last30days' },
    { labelKey: 'filter.date.last90days', value: 'last90days' },
    { labelKey: 'filter.date.weektodate', value: 'weektodate' },
    { labelKey: 'filter.date.yeartodate', value: 'yeartodate' },
    { labelKey: 'filter.date.previousmonth', value: 'previousmonth' },
    { labelKey: 'filter.date.previousyear', value: 'previousyear' },
  ];
  
  export const playerTypeOptions = [
    { labelKey: 'filter.playerType.all', value: 'all' },
    { labelKey: 'filter.playerType.testPlayer', value: 'internal' },
    { labelKey: 'filter.playerType.realPlayer', value: 'real' },
  ];
  
  export const betDateOptions = [
    { labelKey: 'filter.date.custom', value: 'custom' },
    { labelKey: 'filter.date.last7days', value: 'last7days' },
    { labelKey: 'filter.date.last30days', value: 'last30days' },
    { labelKey: 'filter.date.last90days', value: 'last90days' },
    { labelKey: 'filter.date.weektodate', value: 'weektodate' },
    { labelKey: 'filter.date.yeartodate', value: 'yeartodate' },
    { labelKey: 'filter.date.previousmonth', value: 'previousmonth' },
    { labelKey: 'filter.date.previousyear', value: 'previousyear' },
  ];
  
  export const loginKeys = {
    UNIQ_LOGIN: 'loginKeys.UNIQ_LOGIN',
    TOTAL_LOGIN: 'loginKeys.TOTAL_LOGIN',
  };
  
  export const customerDataKeys = {
    NEW_REGISTRATION: 'customerDataKeys.NEW_REGISTRATION',
    PHONE_VERIFIED: 'customerDataKeys.PHONE_VERIFIED',
    FIRST_DEPOSIT: 'customerDataKeys.FIRST_DEPOSIT',
    FIRST_DEPOSIT_AMOUNT_SUM: 'customerDataKeys.FIRST_DEPOSIT_AMOUNT_SUM',
    PURCHASE_AMOUNT_SUM: 'customerDataKeys.PURCHASE_AMOUNT_SUM',
    PURCHASE_AMOUNT_COUNT: 'customerDataKeys.PURCHASE_AMOUNT_COUNT',
    APPROVAL_REDEMPTION_AMOUNT_SUM:
      'customerDataKeys.APPROVAL_REDEMPTION_AMOUNT_SUM',
    REQUEST_REDEMPTION_AMOUNT_SUM:
      'customerDataKeys.REQUEST_REDEMPTION_AMOUNT_SUM',
    REQUEST_REDEMPTION_COUNT_SUM: 'customerDataKeys.REQUEST_REDEMPTION_COUNT_SUM',
    PENDING_REDEMPTION_COUNT_SUM: 'customerDataKeys.PENDING_REDEMPTION_COUNT_SUM',
    PAYNOTE_PENDING_PURCHASE_AMOUNT_SUM : 'customerDataKeys.PAYNOTE_PENDING_PURCHASE_AMOUNT_SUM',
    PAYNOTE_SUCCESS_PURCHASE_AMOUNT_SUM : 'customerDataKeys.PAYNOTE_SUCCESS_PURCHASE_AMOUNT_SUM',
    TRIPLEA_SUCCESS_PURCHASE_AMOUNT_SUM : 'customerDataKeys.TRIPLEA_SUCCESS_PURCHASE_AMOUNT_SUM'
  };
  
  export const transactionDataKeys = {
    ACTIVE_GC_PLAYER: 'transactionDataKeys.ACTIVE_GC_PLAYER',
    ACTIVE_SC_PLAYER: 'transactionDataKeys.ACTIVE_SC_PLAYER',
    SC_STAKED_TOTAL: 'transactionDataKeys.SC_STAKED_TOTAL',
    SC_WIN_TOTAL: 'transactionDataKeys.SC_WIN_TOTAL',
    SC_GGR_TOTAL: 'transactionDataKeys.SC_GGR_TOTAL',
    SC_NEW_ACTIVE_PLAYER: 'New Active SC Player',
  };
  
  export const coinEcoDataKeys = {
    GC_CREDITED_PURCHASE: 'coinEcoDataKeys.GC_CREDITED_PURCHASE',
    SC_CREDITED_PURCHASE: 'coinEcoDataKeys.SC_CREDITED_PURCHASE',
    GC_AWARDED_TOTAL: 'coinEcoDataKeys.GC_AWARDED_TOTAL',
    SC_AWARDED_TOTAL: 'coinEcoDataKeys.SC_AWARDED_TOTAL',
    SC_TOTAL_BALANCE: 'coinEcoDataKeys.SC_TOTAL_BALANCE',
    USC_BALANCE: 'coinEcoDataKeys.USC_BALANCE',
    RSC_BALANCE: 'coinEcoDataKeys.RSC_BALANCE',
  };
  
  export const tableData = [
    'TODAY',
    'YESTERDAY',
    'MONTH_TO_DATE',
    'LAST_MONTH',
    'CUSTOM',
  ];
  
  export const totalTablesList = {
    loginData: loginKeys,
    customerDataKeys: customerDataKeys,
    transactionDataKeys: transactionDataKeys,
    coinEcoDataKeys: coinEcoDataKeys,
  };
  
  export const originalObject = {
    UNIQ_LOGIN: {
      TODAY: 10,
      YESTERDAY: 20,
      MONTH_TO_DATE: 15,
      LAST_MONTH: 12,
      CUSTOM: 30,
    },
    TOTAL_LOGIN: {
      TODAY: 0,
      YESTERDAY: 0,
      MONTH_TO_DATE: 1,
      LAST_MONTH: 0,
      CUSTOM: 1,
    },
    NEW_REGISTRATION: {
      TODAY: 0,
      YESTERDAY: 0,
      MONTH_TO_DATE: 2,
      LAST_MONTH: 0,
      CUSTOM: 2,
    },
    PHONE_VERIFIED: {
      TODAY: 0,
      YESTERDAY: 0,
      MONTH_TO_DATE: 0,
      LAST_MONTH: 0,
      CUSTOM: 0,
    },
    FIRST_DEPOSIT: {
      TODAY: 0,
      YESTERDAY: 0,
      MONTH_TO_DATE: 0,
      LAST_MONTH: 0,
      CUSTOM: 0,
    },
    FIRST_DEPOSIT_AMOUNT_SUM: {
      TODAY: null,
      YESTERDAY: null,
      MONTH_TO_DATE: null,
      LAST_MONTH: null,
      CUSTOM: null,
    },
    PURCHASE_AMOUNT_SUM: {
      TODAY: null,
      YESTERDAY: null,
      MONTH_TO_DATE: null,
      LAST_MONTH: null,
      CUSTOM: null,
    },
    PURCHASE_AMOUNT_COUNT: {
      TODAY: 0,
      YESTERDAY: 0,
      MONTH_TO_DATE: 0,
      LAST_MONTH: 0,
      CUSTOM: 0,
    },
    APPROVAL_REDEMPTION_AMOUNT_SUM: {
      TODAY: null,
      YESTERDAY: null,
      MONTH_TO_DATE: null,
      LAST_MONTH: null,
      CUSTOM: null,
    },
    REQUEST_REDEMPTION_AMOUNT_SUM: {
      TODAY: null,
      YESTERDAY: null,
      MONTH_TO_DATE: null,
      LAST_MONTH: null,
      CUSTOM: null,
    },
    REQUEST_REDEMPTION_COUNT_SUM: {
      TODAY: 0,
      YESTERDAY: 0,
      MONTH_TO_DATE: 0,
      LAST_MONTH: 0,
      CUSTOM: 0,
    },
    PENDING_REDEMPTION_COUNT_SUM: {
      TODAY: 0,
      YESTERDAY: 0,
      MONTH_TO_DATE: 0,
      LAST_MONTH: 0,
      CUSTOM: 0,
    },
    ACTIVE_GC_PLAYER: {
      TODAY: 0,
      YESTERDAY: 0,
      MONTH_TO_DATE: 0,
      LAST_MONTH: 0,
      CUSTOM: 0,
    },
    ACTIVE_SC_PLAYER: {
      TODAY: 0,
      YESTERDAY: 0,
      MONTH_TO_DATE: 0,
      LAST_MONTH: 0,
      CUSTOM: 0,
    },
    SC_STAKED_TOTAL: {
      TODAY: 0,
      YESTERDAY: 0,
      MONTH_TO_DATE: 0,
      LAST_MONTH: 0,
      CUSTOM: 0,
    },
    SC_WIN_TOTAL: {
      TODAY: 0,
      YESTERDAY: 0,
      MONTH_TO_DATE: 0,
      LAST_MONTH: 0,
      CUSTOM: 0,
    },
    SC_GGR_TOTAL: {
      TODAY: 0,
      YESTERDAY: 0,
      MONTH_TO_DATE: 0,
      LAST_MONTH: 0,
      CUSTOM: 0,
    },
    SC_NEW_ACTIVE_PLAYER: {
      TODAY: 0,
      YESTERDAY: 0,
      MONTH_TO_DATE: 0,
      LAST_MONTH: 0,
      CUSTOM: 0,
    },
    GC_CREDITED_PURCHASE: {
      TODAY: null,
      YESTERDAY: null,
      MONTH_TO_DATE: null,
      LAST_MONTH: null,
      CUSTOM: null,
    },
    SC_CREDITED_PURCHASE: {
      TODAY: null,
      YESTERDAY: null,
      MONTH_TO_DATE: null,
      LAST_MONTH: null,
      CUSTOM: null,
    },
    GC_AWARDED_TOTAL: {
      TODAY: null,
      YESTERDAY: null,
      MONTH_TO_DATE: null,
      LAST_MONTH: null,
      CUSTOM: null,
    },
    SC_AWARDED_TOTAL: {
      TODAY: null,
      YESTERDAY: null,
      MONTH_TO_DATE: null,
      LAST_MONTH: null,
      CUSTOM: null,
    },
    SC_TOTAL_BALANCE: {
      TODAY: null,
      YESTERDAY: null,
      MONTH_TO_DATE: '0',
      LAST_MONTH: '0',
      CUSTOM: '0',
    },
    USC_BALANCE: {
      TODAY: 0,
      YESTERDAY: 0,
      MONTH_TO_DATE: 0,
      LAST_MONTH: 0,
      CUSTOM: 0,
    },
    RSC_BALANCE: {
      TODAY: 0,
      YESTERDAY: 0,
      MONTH_TO_DATE: 0,
      LAST_MONTH: 0,
      CUSTOM: 0,
    },
  };
  
  export const customerDashboardOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Customers Data Bar Chart',
      },
    },
    barPercentage: 0.6,
  };
  
  export const customerLabelsShortKey = [
    'NR',
    'PV',
    'FD',
    'FDAS',
    'PAS',
    'PAC',
    'ARAS',
    'RRAS',
    'PRCS',
  ];
  
  // export const customerDashboardColors = [
  //   'rgba(255, 99, 132, 0.5)',
  //   'rgba(53, 162, 235, 0.5)',
  //   'rgba(245, 77, 61, 0.5)',
  //   'rgba(220, 174, 150, 0.5)',
  //   'rgba(47, 80, 97, 0.5)',
  // ];
  export const customerDashboardColors = ['rgb(255,255,204)','rgb(194,230,153)','rgb(120,198,121)','rgb(49,163,84)','rgb(0,104,55)'];
  