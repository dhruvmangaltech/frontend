import * as Yup from 'yup'

export const casinoCategorySchema = (t) => Yup.object().shape({
  categoryName: Yup.string().required(t('casinoCategory.inputField.categoryName.errors.required'))
})
