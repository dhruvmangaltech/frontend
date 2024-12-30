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


export const createProductSchema = (t) => Yup.object().shape({
  name: Yup.string()
    .max(200)
    .required(t('productFields.name.errors.required')),

  scale: Yup.string().min(1, t('staffFields.scale.errors.min'))
    .max(200)
    .required(t('productFields.scale.errors.required')),
  size: Yup.string().min(1, t('productFields.size.errors.min'))
    .max(200)
    .required(t('productFields.size.errors.required')),
  description: Yup.string().required(t('productFields.description.errors.required')),
  colour: Yup.string().required(t('productFields.colour.errors.required'))
})