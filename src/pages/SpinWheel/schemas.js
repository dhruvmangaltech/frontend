import * as Yup from 'yup';
export const updateSpinWheelSchema = () => Yup.object().shape({
  gcCoin: Yup.number().integer().min(1,'GC Coin Cannot be 0' ).required('GC Coin Required'),
  scCoin: Yup.number().required('SC Coin Required'),
  priority: Yup.string().required('Priority Required'),
  isAllow : Yup.boolean().required('IsAllow Required'),
  userLimit: Yup.number().when('userLimitCheck', ([userLimitCheck], schema) => {
    if (userLimitCheck) {
      return Yup.number()
        .integer().min(1, 'User limit cannot be 0').required()
        .required('User Limit is required')
    }
    return schema
  }),

});
