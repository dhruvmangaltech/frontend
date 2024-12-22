import * as Yup from 'yup'

export const playerSearchSchmes = () => Yup.object().shape({
  idSearch: Yup.number()
    .typeError('Must be number')
    .positive('Must be positive')
    .integer('Must be more than 0'),
  phoneSearch: Yup.number().typeError('Must be number'),
  affiliateIdSearch: Yup.number().typeError('Must be number'),
  lastIpSearch: Yup.string()
    .matches(
      /^(?:\d{1,3}\.){3}\d{1,3}$/,
      'Must be a valid IP address (e.g., 123.123.123.123)'
    )
})