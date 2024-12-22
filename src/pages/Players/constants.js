export const tableHeaders = [
  { labelKey: 'tableHeaders.id', value: 'userId' },
  { labelKey: 'tableHeaders.email', value: 'email' },
  { labelKey: 'tableHeaders.regDate', value: 'created_at' },
  { labelKey: 'tableHeaders.username', value: 'username' },
  { labelKey: 'tableHeaders.name', value: 'first_name' },
  { labelKey: 'tableHeaders.status', value: 'isActive' },  
  // { labelKey: 'tableHeaders.kycStatus', value: 'kycStatus' },
  { labelKey: 'tableHeaders.action', value: '' },
];

export const initialSet = {
  idSearch: null,
  emailSearch: '',
  firstNameSearch: '',
  lastNameSearch: '',
  userNameSearch: '',
  phoneSearch: '',
  affiliateIdSearch: '',
  regIpSearch: '',
  lastIpSearch: ''
}

export const checkForReset = (globalSearch) => {
  const tempData = { ...globalSearch }
  for (const key in tempData) {
    if (tempData[key] === '' || !tempData[key]) {
      delete tempData[key]
    }
  }
}
