export const tableHeaders = (isAllUser) => [
    { labelKey: 'transactions.headers.id', value: 'casinoTransactionId' },
    { labelKey: 'transactions.headers.paymentId', value: 'paymentId' },
    { labelKey: isAllUser ? 'transactions.headers.email' : 'transactions.headers.actioneeName', value: 'actioneeName' },
    // { labelKey: 'transactions.headers.actionType', value: 'scCoin' },
    { labelKey: 'transactions.headers.amount', value: 'isActive' },
    { labelKey: 'transactions.headers.gcCoin', value: 'gcCoin' },
    { labelKey: 'transactions.headers.scCoin', value: 'scCoin' },
    { labelKey: 'transactions.headers.transactionType', value: 'transactionType' },
    { labelKey: 'transactions.headers.paymentMethod', value: 'paymentMethod' },
    { labelKey: 'transactions.headers.status', value: 'PackageUsers'},
    { labelKey: 'transactions.headers.createdAt', value: 'action' },
    { labelKey: 'transactions.headers.action', value: 'action' },
    { labelKey: 'transactions.headers.details', value: 'details' },

]