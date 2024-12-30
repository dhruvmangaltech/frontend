export const tableHeaders = [
  { labelKey: 'tableHeaders.id', value: 'productId' },
  { labelKey: 'tableHeaders.name', value: 'name' },
  { labelKey: 'tableHeaders.color', value: 'colour' },
  { labelKey: 'tableHeaders.scale', value: 'scale' },
  { labelKey: 'tableHeaders.size', value: 'size' },
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
