import * as Yup from 'yup'

export const editSimpleFormSchema = () => {
  return (Yup.object().shape({
    reason: Yup.string()
      .max(50, 'Max 50 characters')
      .required('Reason Required')
  }))
}

export const documentApproveSchema = () => {
  return (Yup.object().shape({
    reason: Yup.string()
      .max(50, 'Max 50 characters')
      .required('Reason Required'),
    expiryDate : Yup.string()
    .required('Date Required'),
    status : Yup.string()
    .required('Status Required')
  }))
}

export const passwordSchema = Yup.object().shape({
  password: Yup.string()
    .required('Password must contain at least 10 characters')
    .min(10, 'Password must contain at least 10 characters')
    .max(20, 'Password must not contain more than 20 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!+@#\\$%\\^&\\*])/,
      'Password must contain at least one lowercase & uppercase letter, digit and special character'
    ),
  confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Password and Confirm Password do not match')
})

export const addDeductCoinFormSchema = () => {
  return (Yup.object().shape({
    coinType: Yup.object().required('Coin Type value is required.'),
    operationType: Yup.object().required('Operation Type value is required.'),
    gcAmount: Yup.number().when('coinType', ([coinType], schema) => {
      if (coinType.value === 'gc') {
        return Yup.number()
          .typeError('Must be number')
          .required('Amount is required')
      }
      return schema
    }),
    scAmount: Yup.number().when('coinType', ([coinType], schema) => {
      if (coinType.value === 'sc' || coinType.value === 'wsc' || coinType.value === 'psc' || coinType.value === 'bsc') {
        return Yup.number()
          .typeError('Must be number')
          .required('Amount is required')
      }
      return schema
    }),
    reason: Yup.string()
      .max(50, 'Max 50 characters')
      .required('Reason Required')

  }))
}

export const multiFieldFormSchema = () => {
  return (Yup.object().shape({
    reason: Yup.string()
      .max(50, 'Max 50 characters')
      .required('Reason Required'),

    ssn: Yup.number()
    .integer('Only numbers are allowed')
    .lessThan(1000000000, 'Number can not contain more than 9 numbers')
    .positive('Number should be positive')
    .required('Social Security Number Required')
  }))
}
