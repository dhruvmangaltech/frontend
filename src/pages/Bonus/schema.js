import * as Yup from 'yup'

export const createBonusSchema = (t) => 
Yup.object().shape({
  bonusName: Yup.string()
    .required(t('errors.bonusName')),
  // bonusType: Yup.string()
  //   .required(t('errors.bonusType')),
  // gcAmount: Yup.number()
  //   .when('bonusType', {
  //       is: (v) => v === 'gc' || v === 'both' || v === 'daily bonus' || v === 'welcome bonus',
  //       then: () => Yup.number().required(t('errors.gcAmount')),
  //       otherwise: () => Yup.number().nullable(),
  //   }),
  // scAmount: Yup.number()
  //   .when('bonusType', {
  //       is: (v) => v === 'sc' || v === 'both' || v === 'daily bonus' || v === 'welcome bonus',
  //       then: () => Yup.number().required(t('errors.scAmount')),
  //       otherwise: () => Yup.number().nullable(),
  //   }),
  // fsAmount: Yup.number()
  //   .when('bonusType', {
  //       is: (v) => v === 'freespin',
  //       then: () => Yup.number().required(t('errors.fsAmount')),
  //       otherwise: () => Yup.number().nullable(),
  //   }),
  // numberOfUser: Yup.number()
  //   .required(t('errors.numberOfUser')),
  description: Yup.string()
    .required(t('errors.description')),
})