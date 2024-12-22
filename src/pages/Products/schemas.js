import * as Yup from 'yup'

export const productSearchSchmes = () => Yup.object().shape({
  idSearch: Yup.number()
    .typeError('Must be number')
    .positive('Must be positive')
    .integer('Must be more than 0'),
  nameSearch: Yup.string().typeError('Must be a string'),
  sizeSearch: Yup.number().typeError('Must be number'),
  colourSearch: Yup.string().typeError('Must be a string'),
  ScaleSearch: Yup.number().typeError('Must be number')
})